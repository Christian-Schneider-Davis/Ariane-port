// Programs (linked from "Let's Talk"). Text copied verbatim from the original site.
// Each detail page is a list of blocks: { label?, text?: string[], items?: string[] }.

export const programsPage = {
  title: 'Work with me',
  intro:
    'Every organisation is different. Whether you are shaping a campaign, refining your narrative, or navigating policy spaces, I work alongside you to design tailored solutions that are strategic, creative, and grounded in your reality.',
  listHeading: 'Services',
  more: 'View Details',
  aboutHeading: 'About',
  contactCta: 'Email for more info',
}

export const programs = [
  {
    slug: 'narrative-storytelling',
    wixId: 'fd02ae15-2f56-4414-9b3c-5a5636d4e558',
    title: 'Narrative & Storytelling',
    duration: '1 Day',
    image: 'programNarrative',
    blocks: [
      {
        text: [
          'Shift the Story. Shift the Power.',
          'This Program helps organisations rethink how they communicate sensitive or complex issues in ways that are ethical, compelling, and transformative.',
        ],
      },
      {
        label: 'Who it’s for:',
        text: [
          'Civil Society Organisations, cultural actors, media, Foundations, Private Sector and campaigns working on sensitive issues (children, conflict, migration, violence, inequality).',
        ],
      },
      {
        label: 'Focus areas:',
        items: [
          'Reframing harmful or limiting narratives',
          'Ethical storytelling and safeguarding',
          'Human-centered messaging',
          'Integrating art and creative expression into advocacy',
          'Building emotional resonance without exploitation',
        ],
      },
      {
        label: 'What you receive:',
        items: [
          'Narrative framing',
          'Messaging guidelines breaking harmful narratives',
          'Story selection criteria',
          'Ethical storytelling checklist',
          'Practical communication tools',
        ],
      },
      { text: ['This program ensures your message does not just inform — it resonates and mobilizes.'] },
      { label: 'Format:', text: ['In-person or virtual', 'Half-day to multi-session programs'] },
      { text: ['Fully tailored to your context. For more information, please contact me directly.'] },
    ],
  },
  {
    slug: 'free-advocacy-consultation',
    wixId: '39decf85-4eaa-4724-9f0f-d732cae00479',
    title: 'Free Advocacy Consultation',
    duration: '1 Day',
    image: 'programConsultation',
    blocks: [
      {
        text: [
          'Many organisations are active but not always strategic. This free consultation explore your current advocacy approach to identify what works, what doesn’t, and what practical next steps could be implemented.',
        ],
      },
      {
        label: 'Who it’s for:',
        text: [
          'NGOs, International organisations, Foundations, grassroots organizations, coalitions, and advocacy teams that want sharper impact, clearer positioning, or are preparing for a new phase.',
        ],
      },
      {
        label: 'What we assess:',
        items: [
          'Advocacy objectives and theory of change',
          'Power mapping and target selection',
          'Narrative strength and messaging clarity',
          'Policy alignment',
          'Partnerships and coalition dynamics',
          'Risks and blind spots',
        ],
      },
      {
        label: 'What you receive:',
        items: [
          'A short written diagnostic report',
          'Clear strategic recommendations',
          'Quick wins for immediate improvement',
          'Possibility to engage in follow-up consultation sessions',
        ],
      },
      { text: ['This service gives you clarity, direction, and renewed momentum. For more information, please contact me directly.'] },
    ],
  },
  {
    slug: 'training-capacity-building',
    wixId: '41c75d86-632e-428c-9a73-43180dbe43a8',
    title: 'Training & Capacity Building',
    duration: '1 Day',
    image: 'programTraining',
    blocks: [
      {
        text: [
          'We design and deliver tailored workshops for organisations and communities who want to strengthen their skills and understanding in advocacy, communications and campaign design.',
        ],
      },
      {
        label: 'Workshops can focus on:',
        items: [
          'Advocacy strategy and campaign design',
          'Engaging policymakers and decision-makers',
          'Safe & Ethical communications',
          'Narrative Framing',
        ],
      },
      { label: 'Format:', text: ['In-person or virtual', 'Half-day to multi-session programs'] },
      { text: ['Fully tailored to your context.', 'Participants leave with tools they can immediately apply.'] },
      { text: ['For more information, please contact me directly.'] },
    ],
  },
  {
    slug: 'creative-advocacy',
    wixId: '873aad94-3136-4722-8052-9bca7f294761',
    title: 'Creative Advocacy',
    image: 'programCreative',
    blocks: [
      {
        text: [
          'Creative approaches can break through advocacy fatigue and reach audiences beyond traditional policy spaces. This advisory service helps integrate art, culture, and creativity into serious human rights work.',
        ],
      },
      {
        label: 'Who it’s for:',
        text: ['Organisations looking to innovate their advocacy, expand audiences, or rethink engagement.'],
      },
      {
        label: 'Areas of collaboration:',
        items: ['Designing art-based advocacy initiatives', 'Cultural partnerships', 'Creative campaign concepts'],
      },
      {
        label: 'What you receive:',
        items: ['Concept development', 'Creative strategy integration', 'Partnership mapping', 'Event or initiative blueprint'],
      },
      { label: 'Format:', text: ['In-person or virtual', 'Half-day to multi-session programs'] },
      { text: ['Fully tailored to your context.', 'This is where strategy becomes memorable.'] },
      { text: ['For more information, please contact me directly.'] },
    ],
  },
]

export const getProgram = (slug) => programs.find((p) => p.slug === slug)
export const programByWixId = (id) => programs.find((p) => p.wixId === id)
