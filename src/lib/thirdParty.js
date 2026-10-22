// The ONLY place to add analytics, tracking pixels or other third-party scripts.
// Never paste them into index.html: anything listed here loads only after the
// visitor allows its category in the cookie banner, and never before.
//
// Each entry: { category: 'analytics' | 'marketing', src?, attrs?, init? }
// After adding a tracker, bump VERSION in consent.js so returning visitors are asked again.
export const thirdParty = [
  // Example: Plausible analytics
  // { category: 'analytics', src: 'https://plausible.io/js/script.js', attrs: { 'data-domain': 'arianelignier.com' } },
  //
  // Example: LinkedIn Insight Tag
  // {
  //   category: 'marketing',
  //   init: () => { window._linkedin_partner_id = 'YOUR_ID'; window._linkedin_data_partner_ids = ['YOUR_ID'] },
  //   src: 'https://snap.licdn.com/li.lms-analytics/insight.min.js',
  // },
]
