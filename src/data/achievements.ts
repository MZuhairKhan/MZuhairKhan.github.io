export type AchievementImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type AchievementLink = {
  label: string;
  url: string;
};

export type Achievement = {
  id: string;
  org: string;
  title: string;
  url?: string;
  result: string;
  description?: string;
  image: string;
  /** Attribution shown over the image, e.g. "Photo: Junction". */
  imageCredit?: string;
  /** Optional link for the image credit (source/attribution). */
  imageCreditUrl?: string;
  /** External code repo for this award (shown as "View code"). */
  repo?: string;
  /** Slug of an on-site project this award maps to (shown as "View project"). */
  projectId?: string;
  /** Credly verification link for a credential. */
  credlyUrl?: string;
  /** URL slug for a dedicated detail page (/awards/<slug>). */
  slug?: string;
  /** Longer write-up shown on the detail page (falls back to description). */
  detail?: string;
  /** Photographs shown on the detail page. */
  images?: AchievementImage[];
  /** Related external/on-site links shown on the detail page. */
  links?: AchievementLink[];
  /** Logo shown on a tinted plate instead of a photo thumbnail (competition/event logos). */
  logo?: string;
  /** CSS aspect-ratio override for the card thumbnail (e.g. "12 / 5" for a wide title banner). */
  thumbRatio?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'mimir-deepdive',
    org: 'Mimir',
    title: 'Deep Dive Commercialisation Competition',
    url: 'https://www.joinmimir.org/deepdive',
    result: '1st Place',
    description:
      'Won the multi-round competition by developing a viable business strategy for a research-stage invention, working in conjunction with Willo Technologies.',
    image: '/thumbs/award-mimir.jpg',
    imageCredit: 'Photo: Joonatan Rimpiläinen',
    imageCreditUrl: 'https://www.instagram.com/JoonatanPhotos',
    slug: 'mimir-deep-dive',
    detail:
      'I won Mimir\'s multi-round Deep Dive Commercialisation Competition, building a viable go-to-market strategy for a research-stage invention in conjunction with <a href="https://willo.tech/" target="_blank" rel="noopener">Willo Technologies</a>. Across the rounds we validated the technology\'s commercial potential, shaped a business model around it, and pitched the final strategy to the judges.',
    images: [
      {
        src: '/awards/mimir-presenting.jpg',
        alt: 'Presenting during the Deep Dive competition',
        caption: 'Presenting during the competition.',
      },
    ],
  },
  {
    id: 'dash-hackathon',
    org: 'Dash',
    title: 'Dash Hackathon 2023: Sumitomo SHI FW Challenge',
    result: '2nd Place',
    description: 'Placed second at the Dash Hackathon 2023, tackling the Sumitomo SHI FW industry challenge.',
    image: '/awards/dash-hackathon.jpg',
    slug: 'dash-hackathon-2023',
    detail:
      "Placed second at Dash Hackathon 2023, taking on Sumitomo SHI FW's industry challenge over the event and presenting our solution to the judges.",
    images: [],
  },
  {
    id: 'junction-quantum-hack',
    org: 'Junction',
    title: 'Quantum Hack 2026 — QMill Challenge',
    url: 'https://hackjunction.app/hackathons/quantum-hack-2026',
    result: 'Top 5',
    description:
      "Voted into the top 5 by audience vote at Junction's Quantum Hack 2026 (Espoo) and presented to the jury for a shot at the main prize — our team took on QMill's challenge on peaked quantum circuits, estimating peak bitstrings and optimising QASM circuits.",
    image: '/thumbs/award-junction.jpg',
    imageCredit: 'Photo: Junction',
    imageCreditUrl: 'https://www.flickr.com/photos/hackjunction/55319999803/',
    projectId: 'unction',
  },
  {
    id: 'iqm-quantum',
    org: 'Womanium',
    title: 'Quantum Hackathon Challenge - IQM',
    result: 'Finalist',
    description: "Reached the finalist stage of IQM's DAQC-VQE challenge at the Womanium Quantum Hackathon 2022.",
    image: '/awards/iqm-womanium-certificate.jpg',
    logo: '/logos/womanium.png',
    projectId: 'daqc-vqe',
  },
  {
    id: 'qcoder-006',
    org: 'QCoder',
    title: 'QCoder Programming Contest 006',
    result: '15th',
    description: 'Placed 15th in the QCoder Programming Contest 006.',
    image: '/thumbs/award-qcoder.png',
    logo: '/awards/qcoder.svg',
  },
  {
    id: 'imc-prosperity',
    org: 'IMC',
    title: 'Prosperity 3 Algorithmic Trading Competition',
    result: '25th in Italy',
    description: "Ranked 25th in Italy in IMC's Prosperity 3 algorithmic trading competition.",
    image: '/thumbs/prosperity-3.jpg',
    projectId: 'alphapolis',
  },
  {
    id: 'quera-neutral-atoms',
    org: 'QuEra Computing',
    title: 'Introduction to Programming with Neutral Atoms',
    result: 'Certificate',
    description: "Completed QuEra Computing's training on programming neutral-atom quantum computers.",
    image: '/awards/quera-neutral-atoms.jpg',
  },
  {
    id: 'prompt-hackathon',
    org: 'Prompt',
    title: 'Prompt Finance Hackathon',
    result: 'Participant',
    description:
      "Participated in Prompt's finance hackathon at Aalto, building an agentic GraphRAG system for Taxxa's tax-research challenge.",
    image: '/awards/prompt-hackathon.jpg',
    thumbRatio: '12 / 5',
    projectId: 'agentic-graphrag',
  },
];
