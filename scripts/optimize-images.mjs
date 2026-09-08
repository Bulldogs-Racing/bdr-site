#!/usr/bin/env node
/**
 * Turn a folder of originals into web-ready derivatives.
 *
 *   node scripts/optimize-images.mjs <source-dir> [--out public/media] [--widths 640,1280,1920]
 *
 * Writes <name>-<width>.avif and <name>-<width>.webp, never upscaling past the
 * source. AVIF first because it is roughly half the bytes of WebP at the same
 * quality; WebP is the fallback for older Safari.
 *
 * Why this exists: the legacy media library is ~50 MB of unoptimized PNG
 * screenshots. Committing that to a GitHub Pages repo would be slow to clone
 * and slow to serve. Run originals through here and commit only the output.
 *
 * Reference the results with a <picture> element and explicit width/height so
 * the page does not shift as images load.
 */
import { mkdir, readdir, stat } from 'node:fs/promises'
import { basename, extname, join, resolve } from 'node:path'
import sharp from 'sharp'

const args = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? fallback : args[i + 1]
}

const srcDir = args.find(
  (a) => !a.startsWith('--') && args[args.indexOf(a) - 1]?.startsWith('--') !== true,
)
const outDir = resolve(flag('out', 'public/media'))
const widths = flag('widths', '640,1280,1920')
  .split(',')
  .map((w) => Number(w.trim()))
  .filter(Boolean)

if (!srcDir) {
  console.error(
    'Usage: node scripts/optimize-images.mjs <source-dir> [--out public/media] [--widths 640,1280,1920]',
  )
  process.exit(1)
}

const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])

await mkdir(outDir, { recursive: true })
const entries = await readdir(resolve(srcDir))
let done = 0
let savedFrom = 0
let savedTo = 0

for (const entry of entries) {
  const ext = extname(entry).toLowerCase()
  if (!SOURCE_EXT.has(ext)) continue

  const srcPath = join(resolve(srcDir), entry)
  const name = basename(entry, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const image = sharp(srcPath)
  const meta = await image.metadata()
  savedFrom += (await stat(srcPath)).size

  for (const width of widths) {
    // Never upscale: a 900px original does not get a 1920px derivative.
    if (meta.width && width > meta.width && width !== Math.min(...widths)) continue
    const target = Math.min(width, meta.width ?? width)

    for (const [format, options] of [
      ['avif', { quality: 55, effort: 5 }],
      ['webp', { quality: 78 }],
    ]) {
      const outPath = join(outDir, `${name}-${target}.${format}`)
      const resized = image.clone().resize({ width: target, withoutEnlargement: true })
      const info = await resized[format](options).toFile(outPath)
      savedTo += info.size
    }
  }

  done++
  if (done % 20 === 0) console.log(`  ${done} images...`)
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`
console.log(`\n${done} images -> ${outDir}`)
console.log(`${mb(savedFrom)} in, ${mb(savedTo)} out across ${widths.length} widths x 2 formats`)
