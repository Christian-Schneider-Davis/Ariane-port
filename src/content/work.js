// "Selected Work" pages. Text copied verbatim from the original site.
// A paragraph can be a plain string or { text, href } for a link.

export const work = [
  {
    slug: 'campaigns-advocacy',
    title: 'Campaigns & Advocacy',
    intro:
      'From concept to execution, I create campaigns that connect emotion with evidence. By blending advocacy, communications, and creativity, I turn complex issues into powerful public movements.',
    projects: [
      {
        title: 'Prove It Matters campaign',
        image: 'workProveIt',
        imageHref: 'https://proveitmattersnow.com/',
        paragraphs: [
          "Created and developed an innovative advocacy campaign for the United Nations Office of the Special Representative of the Secretary-General for Children and Armed Conflict that combines children's participation, storytelling, art, and strategic advocacy. In just over a year, the campaign engaged more than 10,500 children worldwide, built a coalition of partners across multiple sectors, mobilized new resources, and strengthened political engagement from more than 40 Member States around the protection of children affected by armed conflict.",
          "The initiative will culminate in a major exhibition at the United Nations Headquarters in New York in 2027, bringing children's voices directly into one of the world's most important policy-making spaces.",
          { text: 'More information: www.proveitmattersnow.com', href: 'http://www.proveitmattersnow.com/' },
        ],
      },
      {
        title: 'Training of Trainers (ToT)',
        image: 'workToT',
        paragraphs: [
          'Designed and facilitate a Training of Trainers (ToT) on advocacy, helping participants to strengthen their ability to analyse political contexts, develop evidence-based advocacy strategies, influence decision-makers, and engage key stakeholders.',
          'By enabling participants to transfer knowledge within their organisations and networks, the programme contributed to building sustainable local capacity and advancing localisation efforts.',
        ],
      },
    ],
  },
  {
    slug: 'narrative-communications',
    title: 'Narrative Change & Strategic Communications',
    titleLines: ['Narrative Change &', 'Strategic Communications'],
    intro:
      'I help organizations communicate complex issues in ways that are accessible, persuasive, and aligned with their advocacy objectives. My work includes communication strategies, narrative framing, messaging development, training, and public speaking on advocacy and communications issues.',
    projects: [
      {
        title: 'Trainings',
        image: 'workTrainings',
        paragraphs: [
          'Designed and delivered training programmes on narrative framing, safe communications, strategic storytelling, and audience engagement for civil society organizations, humanitarian actors, and advocacy professionals. The trainings equipped participants with practical tools to communicate complex and sensitive issues more effectively.',
        ],
      },
      {
        title: 'Speaking Engagements & Thought Leadership',
        image: 'workSpeaking',
        paragraphs: [
          "Invited to speak at international conferences, workshops, and expert discussions on advocacy, strategic communications, children's rights, disability inclusion, and public engagement. Through these interventions, I share practical insights on narrative change, participation, and communicating complex issues in ways that inspire action.",
        ],
        listHeading: 'Examples of Recent Speaking Engagements:',
        list: [
          {
            text: "'Child’s Play: An Investigation of Violence, Desires, and Taboos Through Art!', organized by 1014 in New York.",
            href: 'https://www.1014.nyc/events/childs-play',
          },
          { text: '“Breaking Boundaries Through Art: Women Creating, Resisting, and Redefining”, organized by Miss Porter\'s School',
            href: 'https://www.1014.nyc/events/childs-play',
           },
          { text: 'After Hours Podcast - Storytelling for Change, Timberwolf Studio',
            href: 'https://www.youtube.com/watch?v=3vYBI2H5FOc',
           },
        ],
      },
    ],
  },
  {
    slug: 'public-engagement',
    title: 'Public Engagement & Participation',
    titleLines: ['Public Engagement', '& Participation'],
    intro:
      'I believe meaningful change happens when people are not only informed, but genuinely involved. Through participatory approaches, creative engagement, and public-facing initiatives, I help organizations create spaces where voices can be heard, stories can be shared, and audiences can become part of the conversation.',
    projects: [
      {
        title: 'European Disability and Development Week',
        image: 'workEddw',
        paragraphs: [
          'Led the development and delivery of the European Disability and Development Week, a multi-stakeholder platform bringing together organizations of persons with disabilities, civil society, policymakers, donors, and practitioners. The initiative fostered dialogue, knowledge exchange, and collaboration on disability-inclusive international cooperation, helping strengthen participation and visibility of disability rights issues within development and humanitarian agendas.',
        ],
      },
      {
        title: "Children's participation initiatives",
        image: 'workChildren',
        paragraphs: [
          'Designed and facilitated participatory processes enabling children and young people, including those affected by conflict and humanitarian crises, to contribute to advocacy initiatives, campaigns, and policy discussions through creative and child-friendly methodologies.',
        ],
      },
    ],
  },
]

export const getWork = (slug) => work.find((w) => w.slug === slug)
