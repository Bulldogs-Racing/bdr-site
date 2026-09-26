import { readFile, writeFile } from 'node:fs/promises'

const archiveUrl = 'https://us13.campaign-archive.com/home/?u=f8635335d40768a5eea1d3406&id=a1ffae1b07'
const output = new URL('../src/newsletterIssues.json', import.meta.url)

function decodeEntities(text) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' }
  return text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (entity, code) => {
    if (code.startsWith('#')) {
      return String.fromCodePoint(code[1].toLowerCase() === 'x'
        ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10))
    }
    if (!(code in named)) throw new Error(`Unrecognized HTML entity: ${entity}`)
    return named[code]
  })
}

const args = process.argv.slice(2)
const allowStale = args.includes('--allow-stale')
// A saved archive HTML file can also be used for an offline refresh.
const savedArchive = args.find((arg) => arg !== '--allow-stale')

async function syncNewsletters() {
  let html
  if (savedArchive) {
    html = await readFile(savedArchive, 'utf8')
  } else {
    const response = await fetch(archiveUrl, {
      signal: AbortSignal.timeout(allowStale ? 8_000 : 30_000),
    })
    if (!response.ok) throw new Error(`Archive request failed: HTTP ${response.status}`)
    html = await response.text()
  }

  const campaigns = [...html.matchAll(/<li\b[^>]*class="campaign"[^>]*>([\s\S]*?)<\/li>/g)]
  const issues = campaigns.map(([, campaign]) => {
    const match = campaign.match(/^\s*(\d{2})\/(\d{2})\/(\d{4})\s*-\s*<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/)
    if (!match) throw new Error('Archive markup changed; existing issue list was preserved.')
    const [, month, day, year, href, text] = match
    const url = new URL(decodeEntities(href))
    if (!['eepurl.com', 'us13.campaign-archive.com'].includes(url.hostname)
      || !['http:', 'https:'].includes(url.protocol)) {
      throw new Error(`Unexpected issue URL: ${url}`)
    }
    url.protocol = 'https:'
    const title = decodeEntities(text.replace(/<[^>]*>/g, '')).trim()
    if (!title) throw new Error('An issue is missing its title.')
    return { date: `${year}-${month}-${day}`, title, url: url.href }
  }).sort((a, b) => b.date.localeCompare(a.date))

  // Never overwrite the committed snapshot with an empty or unrecognized response.
  if (!issues.length) throw new Error('No issues found; existing issue list was preserved.')
  await writeFile(output, `${JSON.stringify(issues, null, 2)}\n`)
  console.log(`Saved ${issues.length} newsletter issues.`)
}

try {
  await syncNewsletters()
} catch (error) {
  if (!allowStale) throw error
  // Builds may continue offline, but only when a usable snapshot already exists.
  const cached = JSON.parse(await readFile(output, 'utf8'))
  if (!Array.isArray(cached) || !cached.length || cached.some((issue) =>
    typeof issue.title !== 'string' || !issue.title.trim()
    || typeof issue.url !== 'string' || !issue.url.startsWith('https://')
    || !Number.isFinite(Date.parse(issue.date)))) {
    throw new Error('Newsletter refresh failed and no usable cached archive is available.', { cause: error })
  }
  console.warn(`Newsletter refresh failed: ${error.message}. Using ${cached.length} cached issues.`)
}
