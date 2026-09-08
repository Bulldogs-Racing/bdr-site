#!/usr/bin/env node
/**
 * One-shot migration helper: pull content and media off the legacy WordPress
 * site so it can be curated into src/content and public/media.
 *
 *   node scripts/scrape-legacy.mjs            # content only (fast)
 *   node scripts/scrape-legacy.mjs --media    # also download the media library
 *
 * Everything lands in scripts/.scratch/, which is gitignored. Nothing here
 * writes to src/ -- migration is a judgement call, not an import. Read what
 * this produces, then hand-write the good parts into the typed content files.
 *
 * This script is disposable. Once bulldogsracing.com no longer runs WordPress,
 * delete it.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import { dirname, join, extname, basename } from 'node:path'

const SITE = 'https://bulldogsracing.com'
const OUT = new URL('./.scratch/', import.meta.url).pathname
const WANT_MEDIA = process.argv.includes('--media')

/** The custom post types are not exposed over REST, so these are scraped as HTML. */
const TEAM_SITEMAP = `${SITE}/wp-sitemap-posts-team-1.xml`

async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

async function getText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.text()
}

async function write(relPath, contents) {
  const full = join(OUT, relPath)
  await mkdir(dirname(full), { recursive: true })
  await writeFile(full, contents)
  console.log(`  wrote ${relPath}`)
}

/** Crude tag-strip. Good enough to read; never good enough to ship verbatim. */
function toText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function scrapePages() {
  console.log('Pages (REST)...')
  const pages = await getJson(`${SITE}/wp-json/wp/v2/pages?per_page=100`)
  await write('pages.json', JSON.stringify(pages, null, 2))
  for (const page of pages) {
    await write(`pages/${page.slug}.txt`, toText(page.content.rendered))
  }
  console.log(`  ${pages.length} pages`)
}

async function scrapeTeam() {
  console.log('Team bios (HTML, no REST endpoint)...')
  const xml = await getText(TEAM_SITEMAP)
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  for (const url of urls) {
    const slug = url.split('/').filter(Boolean).pop()
    const html = await getText(url)
    // Keep the raw HTML too -- the text strip loses the photo URLs.
    await write(`team/${slug}.html`, html)
    await write(`team/${slug}.txt`, toText(html))
  }
  console.log(`  ${urls.length} members`)
}

async function scrapeMedia() {
  console.log('Media library (REST)...')
  const all = []
  for (let page = 1; ; page++) {
    const res = await fetch(`${SITE}/wp-json/wp/v2/media?per_page=100&page=${page}`)
    if (!res.ok) break
    const batch = await res.json()
    if (!Array.isArray(batch) || batch.length === 0) break
    all.push(...batch)
    if (batch.length < 100) break
  }

  const manifest = all.map((m) => ({
    id: m.id,
    url: m.source_url,
    mime: m.mime_type,
    title: m.title?.rendered,
    alt: m.alt_text,
    bytes: m.media_details?.filesize,
    width: m.media_details?.width,
    height: m.media_details?.height,
  }))
  await write('media.json', JSON.stringify(manifest, null, 2))
  console.log(`  ${manifest.length} items catalogued`)

  if (!WANT_MEDIA) {
    console.log('  (skipping downloads -- pass --media to fetch the files)')
    return
  }

  await mkdir(join(OUT, 'media'), { recursive: true })
  let n = 0
  for (const item of manifest) {
    if (!item.url) continue
    const name = `${item.id}${extname(basename(new URL(item.url).pathname)) || '.bin'}`
    const dest = join(OUT, 'media', name)
    const res = await fetch(item.url)
    if (!res.ok) {
      console.warn(`  ! ${res.status} ${item.url}`)
      continue
    }
    await pipeline(Readable.fromWeb(res.body), createWriteStream(dest))
    n++
    if (n % 25 === 0) console.log(`  ${n}/${manifest.length}`)
  }
  console.log(`  downloaded ${n} files to .scratch/media/`)
  console.log('  next: npm run images -- scripts/.scratch/media')
}

await mkdir(OUT, { recursive: true })
await scrapePages()
await scrapeTeam()
await scrapeMedia()
console.log(`\nDone. Output in scripts/.scratch/ (gitignored).`)
