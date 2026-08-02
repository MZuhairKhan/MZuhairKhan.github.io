export type ExperienceLink = {
  label: string;
  url: string;
};

export type ExperienceImage = {
  /** Public path, e.g. '/experience/vtt-q50.jpg' — drop the file in public/experience/. */
  src: string;
  alt: string;
  caption?: string;
};

export type ExperienceEntry = {
  role: string;
  context?: string;
  org: string;
  orgUrl?: string;
  period: string;
  bullets: string[];
  logo?: string;
  /** Secondary logo nested on the primary, signifying a sub-affiliation (e.g. a group within a university). */
  subLogo?: string;
  subLogoAlt?: string;
  subLogoUrl?: string;
  /** URL slug for the dedicated detail page (/experience/<slug>). Omit for no page. */
  slug?: string;
  /** Lead write-up on the detail page. Separate paragraphs with a blank line. */
  detail?: string;
  /** Full-width image at the top of the detail page. */
  heroImage?: ExperienceImage;
  /** Additional photographs shown beside the write-up on the detail page. */
  images?: ExperienceImage[];
  /** Related on-site or external links shown on the detail page. */
  links?: ExperienceLink[];
};

export const experience: ExperienceEntry[] = [
  {
    role: 'Data Engineer',
    org: 'Lifeline Ventures',
    orgUrl: 'https://lifelineventures.com',
    period: 'Jun 2026 – Present',
    logo: '/logos/lifeline.png',
    slug: 'lifeline-data-engineer',
    heroImage: {
      src: '/experience/lifeline-data-engineer.jpg',
      alt: 'Mohammad Zuhair Khan at Lifeline Ventures',
    },
    bullets: [
      'Continuing at Lifeline Ventures as a Data Engineer, extending the AWS data-warehouse pipelines and the reporting/fund-monitoring automation built during the Harbor project.',
    ],
    detail:
      "I build and maintain the data and automation layer for an early-stage venture-capital fund. As the firm centralises its data into a new AWS warehouse, I build the automation on top — turning live data into faster, more accurate quarterly reviews and fund monitoring, with far less manual work.\n\nThe work runs across three strands. Quarterly-review automation: self-contained, quarter-toggleable fund sheets fed straight from the warehouse that reproduce every reported figure exactly, with a single control to switch quarter across both funds and validation against real spreadsheet recalculation. Fund modelling and monitoring: dashboards that put actual fund performance side by side with the planned portfolio models, built directly from the data lake so targets and reality stay aligned. Data architecture and roadmap: a map of the data landscape end to end, the gaps within it, and a plan for further automation — including where AI use-cases fit fund operations. I also built a Slack bot that reviews investment documents against the firm's templates and flags deviations inside the team's workflow.",
    images: [],
  },
  {
    role: 'Trainee',
    context: 'Harbor by AaltoES',
    org: 'Lifeline Ventures',
    orgUrl: 'https://lifelineventures.com',
    period: 'May 2026 – Jun 2026',
    logo: '/logos/lifeline.png',
    subLogo: '/logos/harbor.png',
    subLogoAlt: 'Harbor by Aaltoes',
    subLogoUrl: 'https://harbor.aaltoes.com',
    slug: 'lifeline-trainee',
    heroImage: {
      src: '/experience/lifeline-trainee.jpg',
      alt: 'Mohammad Zuhair Khan at Lifeline Ventures through the Harbor by AaltoES programme',
    },
    bullets: [
      "Selected through Aaltoes' competitive Harbor programme for a project engagement with Lifeline Ventures.",
      "Automated quarterly-review reporting and built a fund-level performance-vs-plan modelling tool on Lifeline's new AWS data warehouse.",
      'Mapped fragmented investment data (Atominvest, spreadsheets) toward a unified model and scoped AI agents for surfacing investment insights.',
    ],
    detail:
      'I joined Lifeline Ventures through Harbor by AaltoES, a competitive project programme. Over the engagement I automated the firm’s quarterly-review reporting and built a fund-level performance-vs-plan modelling tool on its new AWS data warehouse. Much of the effort sat upstream of that: mapping fragmented investment data spread across Atominvest and spreadsheets toward a single unified model, and scoping AI agents to surface investment insights from it.',
    images: [],
  },
  {
    role: 'Research Trainee',
    org: 'Quantum Algorithms & Software Team, VTT',
    orgUrl: 'https://www.vttresearch.com',
    period: 'Jun 2024 – Dec 2025',
    logo: '/logos/vtt.png',
    slug: 'vtt-research-trainee',
    heroImage: {
      src: '/experience/vtt-q50-launch.jpg',
      alt: 'The Quantum Algorithms & Software team at the VTT Q50 launch',
      caption: 'At the launch of VTT’s Q50 quantum computer with the Quantum Algorithms & Software team.',
    },
    bullets: [
      'Benchmarked and helped launch the VTT Q50 quantum computer.',
      'Optimised GHZ state preparation using graph theory and qubit characterisation.',
    ],
    detail:
      'On VTT’s Quantum Algorithms & Software Team, I benchmarked and helped launch the Q50 superconducting quantum computer, running the characterisation and performance checks that fed into its release. My main research thread was GHZ-state preparation: I developed a graph-theory approach, informed by per-qubit characterisation, to build large entangled states more reliably on the hardware. I presented closely related GHZ work — fidelity estimation and readout-error mitigation on real quantum hardware — as an invited speaker at the ENCCS Quantum Autumn School.',
    images: [],
    links: [{ label: 'Related talks', url: '/talks' }],
  },
  {
    role: 'Research Assistant',
    context: "Bachelor's Thesis",
    org: 'Pico Group, Aalto University',
    orgUrl: 'https://www.aalto.fi',
    period: 'Jun 2023 – May 2024',
    logo: '/logos/aalto.png',
    subLogo: '/logos/pico.png',
    subLogoAlt: 'Pico Group',
    subLogoUrl: 'https://pico.aalto.fi/',
    slug: 'pico-research-assistant',
    heroImage: {
      src: '/experience/pico-research-assistant.jpg',
      alt: 'Pico Group, Aalto University',
    },
    bullets: [
      'Python-based data analysis for experimental measurements.',
      'Operated dilution refrigerators and Vector Network Analysers (VNAs).',
      'Used the Triton cluster for FEM simulations.',
    ],
    detail:
      'This was my Bachelor’s thesis work in Aalto University’s Pico Group, combining hands-on cryogenic experiment with computational analysis. I operated dilution refrigerators and Vector Network Analysers (VNAs) to take low-temperature measurements, wrote Python pipelines to analyse the data, and ran finite-element-method (FEM) simulations on Aalto’s Triton HPC cluster. The work became my B.Sc thesis (completed with Honours): designing and characterising 3D cavity resonators coupled to a quantum circuit refrigerator, working toward photon-number cooling.',
    images: [
      {
        src: '/experience/pico-research-assistant-2.jpg',
        alt: 'A dilution refrigerator at the Pico Group, Aalto University',
        caption: 'A dilution refrigerator, used for the cryogenic measurements.',
      },
    ],
    links: [{ label: "Bachelor's thesis", url: '/papers/bachelors-thesis' }],
  },
];
