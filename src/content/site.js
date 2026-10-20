export const site = {
  name: 'Ariane Lignier',
  wordmark: 'ARIANE LIGNIER',
  email: 'ariane.lignier@gmail.com',
  copyright: '© 2026 Ariane Lignier',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ariane-lignier-b0967570/', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/algnr.photo/', icon: 'instagram' },
  ],
}

// Main navigation. Items with `children` render as a dropdown on desktop
// and as a grouped list in the mobile menu.
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  {
    label: 'Selected Work',
    children: [
      { label: 'Campaigns & Advocacy', to: '/work/campaigns-advocacy' },
      { label: 'Narrative & Communications', to: '/work/narrative-communications' },
      { label: 'Public Engagement & Participation', to: '/work/public-engagement' },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Insights', to: '/insights' },
]
