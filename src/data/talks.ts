export type TalkLink = {
  label: string;
  url: string;
  icon?: 'youtube' | 'slides' | 'code' | 'external';
};

export type Talk = {
  id: string;
  venue: string;
  event?: string;
  title: string;
  role: string;
  description: string;
  date?: string;
  location?: string;
  links?: TalkLink[];
  url?: string;
  image: string;
  /** CSS aspect-ratio for the card image (e.g. "1 / 1" for a square poster shown uncropped). */
  imageRatio?: string;
};

export const talks: Talk[] = [
  {
    id: 'introduction-to-helmi',
    venue: 'ENCCS',
    event: 'Quantum Autumn School 2024',
    title: 'Introduction to Helmi',
    role: 'Invited Speaker',
    description:
      "Invited talk at the ENCCS/NordIQuEst Quantum Autumn School (KTH, Stockholm). Introduced Finland's Q5 quantum computer and delivered a hands-on tutorial on GHZ state fidelity estimation, readout error mitigation, and Multiple Quantum Coherences on real quantum hardware.",
    date: 'Dec 2024',
    location: 'Stockholm, Sweden',
    image: '/thumbs/talk-helmi.jpg',
    links: [
      {
        label: 'Recording',
        url: 'https://www.youtube.com/watch?v=8or26PHrKcI&t=3260',
        icon: 'youtube',
      },
      {
        label: 'Slides',
        url: 'https://enccs.github.io/qas2024/helmi/',
        icon: 'slides',
      },
      {
        label: 'Notebook',
        url: 'https://enccs.github.io/qas2024/notebooks/GHZ_Estimator_Attendees/',
        icon: 'code',
      },
    ],
  },
  {
    id: 'quantum-ml-battle',
    venue: 'Roosh Circle',
    event: 'Papers Club',
    title: 'Quantum ML Battle',
    role: 'Invited Speaker',
    description:
      "Part of Roosh Circle's Papers Club ‘Quantum ML Battle’ on near-term versus fault-tolerant quantum machine learning. As an invited speaker I presented the fault-tolerant case — how it compares with current near-term approaches, and what it would take to bring its practical use forward.",
    date: 'May 2024',
    location: 'Online',
    image: '/thumbs/talk-qml-battle.jpg',
    imageRatio: '1 / 1',
    url: 'https://www.linkedin.com/events/papersclub-quantummlbattle-near7185948508229709824/',
  },
];
