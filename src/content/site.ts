/** Global site facts: identity, contact, nav. Not schema-validated -- it is config, not content. */
export const site = {
  name: 'Bulldogs Racing',
  longName: 'Yale Bulldogs Racing',
  tagline: "Yale University's Formula SAE team",
  description:
    'Bulldogs Racing is Yale University’s Formula SAE team. Since 2006 we have designed, built and raced open-wheel formula cars — fully electric since 2016.',
  founded: 2006,
  url: 'https://bulldogsracing.com',
  email: 'bulldogsracing@yale.edu',
  location: 'New Haven, CT',
  currentSeason: '2026-27',
  currentCarSlug: 'br25',

  socials: [
    { label: 'Instagram', handle: '@yalebdr', url: 'https://www.instagram.com/yalebdr/' },
    {
      label: 'LinkedIn',
      handle: 'Bulldogs Racing',
      url: 'https://www.linkedin.com/company/yale-bulldogs-racing/',
    },
  ],

  /**
   * External forms. These are the reason the site can ship with no backend:
   * Google Forms takes signups, Mailchimp takes newsletter subscriptions.
   * Replace with real endpoints if a Flask/Supabase backend ever lands.
   */
  links: {
    joinForm: 'https://forms.gle/',
    newsletterArchive: 'https://us1.campaign-archive.com/home/',
    newsletterSignup: 'https://yale.us1.list-manage.com/subscribe',
    sponsorshipPacket: '/media/bulldogs-racing-sponsorship-packet-2026-2027.pdf',
    donate: 'mailto:bulldogsracing@yale.edu?subject=Supporting%20Bulldogs%20Racing',
  },

  nav: [
    { label: 'About', to: '/about' },
    { label: 'Team', to: '/team' },
    { label: 'Cars', to: '/cars' },
    { label: 'History', to: '/history' },
    { label: 'Competition', to: '/competition' },
    { label: 'Alumni', to: '/alumni' },
    { label: 'Sponsors', to: '/sponsors' },
    { label: 'News', to: '/news' },
    { label: 'Contact', to: '/contact' },
  ],

  /** Yale requires student organisations to disclaim official affiliation. */
  disclaimer:
    'Bulldogs Racing is a registered Yale undergraduate organisation. This site is not an official publication of Yale University, and Yale is not responsible for its contents.',
} as const
