import type { NewsletterIssue } from '@/lib/schemas'

/**
 * The newsletter is written and hosted in Mailchimp, and stays there -- this
 * page is an index that links out. That is a deliberate call: the archive is
 * not ours to host, and the business team publishes without touching this repo.
 *
 * TODO(business): each `url` below currently points at the legacy WordPress
 * post. Swap them for the Mailchimp campaign-archive URLs, which will outlive
 * the WordPress install.
 */
export const newsletters: NewsletterIssue[] = [
  {
    slug: 'march-newsletter',
    title: 'March Newsletter',
    date: '2020-03-01',
    url: 'https://bulldogsracing.com/march-newsletter',
  },
  {
    slug: 'february-newsletter',
    title: 'February Newsletter',
    date: '2020-02-01',
    url: 'https://bulldogsracing.com/february-newsletter',
  },
  {
    slug: 'january-newsletter',
    title: 'January Newsletter',
    date: '2020-01-01',
    url: 'https://bulldogsracing.com/january-newsletter',
  },
  {
    slug: 'december-2019-newsletter',
    title: 'December 2019 Newsletter',
    date: '2019-12-01',
    url: 'https://bulldogsracing.com/december-2019-newsletter',
  },
  {
    slug: 'october-2019-newsletter',
    title: 'October 2019 Newsletter',
    date: '2019-10-01',
    url: 'https://bulldogsracing.com/october-2019-newsletter',
  },
  {
    slug: 'december-newsletter',
    title: 'December Newsletter',
    date: '2019-12-15',
    url: 'https://bulldogsracing.com/december-newsletter',
  },
  {
    slug: 'november-update',
    title: 'November Update',
    date: '2019-11-01',
    url: 'https://bulldogsracing.com/november-update',
  },
  {
    slug: '2018-19-end-year-review-newsletter',
    title: '2018–19 End of Year Review',
    date: '2019-05-01',
    url: 'https://bulldogsracing.com/2018-19-end-year-review-newsletter',
  },
  {
    slug: 'post-break-updates-gofundme-campaign',
    title: 'Post-Break Updates & GoFundMe Campaign',
    date: '2018-01-15',
    url: 'https://bulldogsracing.com/post-break-updates-gofundme-campaign',
  },
  {
    slug: 'december-2017-update-getting-ready-to-race',
    title: 'December 2017 Update: Getting Ready to Race',
    date: '2017-12-01',
    url: 'https://bulldogsracing.com/december-2017-update-getting-ready-to-race',
  },
]
