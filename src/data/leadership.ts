export type LeadershipLink = {
  label: string;
  url: string;
};

export type LeadershipImage = {
  /** Public path, e.g. '/leadership/aqjc-session.jpg' — drop the file in public/leadership/. */
  src: string;
  alt: string;
  caption?: string;
};

export type LeadershipEntry = {
  role: string;
  org: string;
  orgUrl?: string;
  period: string;
  bullets: string[];
  logo?: string;
  /** URL slug for the dedicated detail page (/leadership/<slug>). Omit for no page. */
  slug?: string;
  /** Lead write-up on the detail page. Separate paragraphs with a blank line. */
  detail?: string;
  /** Photographs shown on the detail page. */
  images?: LeadershipImage[];
  /** Related on-site or external links shown on the detail page. */
  links?: LeadershipLink[];
};

export const leadership: LeadershipEntry[] = [
  {
    role: 'Vice Chair',
    org: 'AaltoAI',
    orgUrl: 'https://www.aaltoai.com',
    period: 'Jun 2026 – Present',
    logo: '/logos/aaltoai.png',
    slug: 'aaltoai-vice-chair',
    bullets: [
      'Vice Chair of AaltoAI, an AI-focused student community at Aalto University, from June 2026.',
    ],
    detail:
      'I serve as Vice Chair of AaltoAI, an AI-focused student community at Aalto University, from June 2026.',
    images: [],
    links: [{ label: 'AaltoAI', url: 'https://www.aaltoai.com' }],
  },
  {
    role: 'Founder & Organiser',
    org: 'Aalto Quantum Journal Club',
    orgUrl: 'https://www.linkedin.com/company/aqjc/',
    period: 'Oct 2024 – Present',
    logo: '/logos/aqjc.png',
    slug: 'aalto-quantum-journal-club',
    bullets: [
      'Founded and single-handedly run the Aalto Quantum Journal Club, a student-focused reading group at Aalto University exploring quantum technology fundamentals.',
      'Curate paper selections, facilitate discussions, and grow community participation.',
    ],
    detail:
      'I founded the Aalto Quantum Journal Club and run it single-handedly — a student-focused reading group at Aalto University for exploring the fundamentals of quantum technology. Each session I curate the paper selection, facilitate the discussion, and have grown participation from the ground up.',
    images: [],
    links: [{ label: 'AQJC on LinkedIn', url: 'https://www.linkedin.com/company/aqjc/' }],
  },
];
