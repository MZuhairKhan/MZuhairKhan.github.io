export type EducationEntry = {
  degree: string;
  minor?: string;
  org: string;
  orgUrl?: string;
  period: string;
  highlights: string[];
  logo?: string;
};

export const education: EducationEntry[] = [
  {
    degree: 'M.Sc in Engineering Physics',
    org: 'Aalto University',
    orgUrl: 'https://www.aalto.fi',
    period: 'Aug 2024 – Present',
    logo: '/logos/aalto.png',
    highlights: [
      'Recipient of Category A scholarship (100% waiver).',
      'Professor E. J. Nyström scholarship.',
    ],
  },
  {
    degree: 'B.Sc in Quantum Technology',
    minor: 'Minor in Computer Science',
    org: 'Aalto University',
    orgUrl: 'https://www.aalto.fi',
    period: 'Aug 2021 – Jun 2024',
    logo: '/logos/aalto.png',
    highlights: [
      'Graduated with Honours.',
      'Recipient of Category A scholarship (100% waiver).',
      "Dean's incentive scholarship (2022 – 2024).",
    ],
  },
];
