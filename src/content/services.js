// Text below is copied verbatim from the original site.

export const servicesPage = {
  title: 'Work with me',
  lead: 'Every organisation is different.',
  intro:
    'Whether you are shaping a campaign, refining your narrative, or navigating policy spaces, I work alongside you to design tailored solutions that are strategic, impactful and grounded in your reality.',
  listHeading: 'Services',
  more: 'View More',
  quote: {
    heading: 'Get a Quote',
    submit: 'Send',
  },
}

// Order matches the Services page on the original site.
export const services = [
  {
    slug: 'advocacy',
    title: 'Advocacy & Stakeholder Engagement',
    image: 'serviceAdvocacy',
    summary:
      'I support organizations in strengthening their advocacy efforts, identifying strategic opportunities, and building relationships with governments, donors, partners, and other key stakeholders.',
    tagline:
      'Helping organizations build support, influence decision-makers, and create meaningful partnerships.',
    body: [
      'Many organizations do excellent work but struggle to engage the people who can help drive change.',
      'I support organizations in strengthening their advocacy efforts, identifying strategic opportunities, and building relationships with governments, donors, partners, and other key stakeholders.',
    ],
    sections: [
      {
        heading: 'What this can include',
        items: [
          'Advocacy strategy',
          'Stakeholder mapping',
          'Government engagement plans',
          'Coalition building',
          'Partnership development',
          'Donor engagement',
          'High-level outreach',
          'Event and diplomatic engagement strategy',
          'Briefing notes and advocacy materials',
          'Advocacy objectives and theory of change',
          'Narrative strength and messaging clarity',
          'Policy alignment',
          'Risks and conflict analysis',
        ],
      },
      {
        heading: 'Typical projects',
        items: [
          'Supporting a new advocacy initiative',
          'Building engagement with governments',
          'Preparing for a major policy moment',
          'Developing partnerships around a campaign',
          'Creating stakeholder engagement plans',
        ],
      },
    ],
    details: [{ label: 'Languages:', text: ['French and English'] }],
  },
  {
    slug: 'campaigns',
    pricing: true,
    title: 'Campaign Strategy & Public Engagement',
    image: 'serviceCampaigns',
    summary:
      'I support organizations in developing campaigns that raise visibility, mobilize, audiences, and strengthen support for key issues. Through targeted stakeholder engagement and coalition building, I help create the conditions for influence, collaboration, and lasting impact.',
    tagline: 'Turning awareness into action.',
    body: [
      'Many organizations invest heavily in campaigns but struggle to create real engagement. I work with organizations to design campaigns that connect with people, inspire participation, and strengthen support for important causes.',
    ],
    sections: [
      {
        heading: 'What this can include',
        items: [
          'Political analysis',
          'Campaign design',
          'Audience analysis',
          'Messaging development',
          'Creative briefs',
          'Public engagement planning',
          'Campaign reviews',
          'Launch strategies',
          'Activation concepts',
        ],
      },
      {
        heading: 'Typical projects',
        items: [
          'Global advocacy campaigns',
          'Social media campaign',
          'Awareness initiatives',
          'Public engagement efforts',
        ],
      },
    ],
    details: [{ label: 'Language:', text: ['French and English'] }],
  },
  {
    slug: 'strategic-communications',
    pricing: true,
    title: 'Strategic Communications',
    image: 'serviceComms',
    summary:
      'I help organizations strengthen their messaging and communicate with greater clarity, credibility, and impact.',
    tagline: 'Helping organizations communicate complex issues clearly and effectively.',
    body: [
      'I help organizations strengthen their messaging and communicate with greater clarity, credibility, and impact. I also helps organisations rethink how they communicate sensitive or complex issues in ways that are ethical, compelling, and transformative.',
    ],
    sections: [
      {
        heading: 'What this can include',
        items: [
          'Communication strategies',
          'Executive communications',
          'Speech writing',
          'Thought leadership',
          'Reports and publications',
          'Human-centered messaging',
          'Donor communications',
          'Strategic advice',
          'Narrative framing',
          'Messaging guidelines breaking harmful narratives',
          'Ethical storytelling and safeguard',
          'Practical communication tools',
        ],
      },
      {
        heading: 'Typical projects',
        items: [
          'Communications strategy',
          'Organizational repositioning',
          'Executive communications support',
          'Campaign messaging',
          'Public speaking engagements',
          'Donor communications',
        ],
      },
    ],
    details: [{ label: 'Language:', text: ['French and English'] }],
  },
  {
    slug: 'creative-advocacy',
    pricing: true,
    title: 'Creative Advocacy',
    image: 'serviceCreative',
    summary:
      'Creative approaches can break through advocacy fatigue. This advisory service helps integrate, art, culture, and creativity into serious human rights work.',
    tagline: 'Creative approaches to advocacy, engagement, and social change.',
    body: [
      "Today's audiences are overwhelmed with information.",
      'Creating awareness is no longer enough.',
      'People need experiences, stories, and moments that help them connect emotionally with an issue. I help organizations explore creative ways of engaging audiences through storytelling, exhibitions, visual narratives, artistic collaborations, and participatory experiences.',
    ],
    intro: [
      {
        label: 'Who it’s for:',
        text: ['Organisations looking to innovate their advocacy, expand audiences, or rethink engagement.'],
      },
    ],
    sections: [
      {
        heading: 'Areas of collaboration:',
        items: [
          'Designing art-based advocacy initiatives',
          'Cultural partnerships',
          'Creative campaign concepts',
        ],
      },
      {
        heading: 'What this can include:',
        items: [
          'Exhibition concepts',
          'Narrative development',
          'Storytelling projects',
          'Visual storytelling',
          'Creative campaign concepts',
          'Public installations',
          'Testimonial-based initiatives',
          'Documentary and multimedia approaches',
          'Audience engagement experiences',
        ],
      },
      {
        heading: 'Typical projects',
        items: [
          'Advocacy exhibitions',
          'Creative campaigns',
          'Storytelling initiatives',
          'Awareness and engagement events',
          'Multimedia projects',
        ],
      },
    ],
    details: [
      { label: 'Format:', text: ['In-person or virtual', "Duration will be adapted to the organisation's need."] },
      { label: 'Language:', text: ['French and English.'] },
    ],
    closing: ['Fully tailored to your context.', 'For more information, please contact me directly.'],
  },
]

export const pricingCta = 'Contact for Pricing'

export const getService = (slug) => services.find((s) => s.slug === slug)
