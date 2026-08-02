export type Certification = {
  name: string;
  issuer: string;
  year: string;
  /** Badge / seal image. */
  image: string;
  /** Verification link (Credly) or the full certificate image. */
  url: string;
};

export const certifications: Certification[] = [
  {
    name: 'Quantum Business Foundations',
    issuer: 'IBM',
    year: '2024',
    image: '/badges/quantum-business-foundations.png',
    url: 'https://www.credly.com/badges/2d62375d-727f-44e0-883c-e25b792b02e4/public_url',
  },
  {
    name: 'Variational Algorithm Design',
    issuer: 'IBM',
    year: '2024',
    image: '/badges/variational-algorithm-design.png',
    url: 'https://www.credly.com/badges/ef836de9-ebcd-44f4-920e-11cd425ed217/public_url',
  },
  {
    name: 'Basics of Quantum Information',
    issuer: 'IBM',
    year: '2024',
    image: '/badges/basics-of-quantum-information.png',
    url: 'https://www.credly.com/badges/6e223917-03ea-422d-bcfb-44e09f0fec84/public_url',
  },
  {
    name: 'Practical Introduction to Quantum-Safe Cryptography',
    issuer: 'IBM',
    year: '2024',
    image: '/badges/quantum-safe-cryptography.png',
    url: 'https://www.credly.com/badges/1bc1fd73-736d-419c-9598-951de637833e/public_url',
  },
  {
    name: 'Qubit × Qubit Quantum Winter School',
    issuer: 'Microsoft',
    year: '2023',
    image: '/badges/qubit-by-qubit-winter-school.png',
    url: 'https://www.credly.com/badges/0dd5106d-d060-4069-8572-27c27fcd700f/public_url',
  },
  {
    name: 'IBM Quantum Challenge — Spring 2023',
    issuer: 'IBM',
    year: '2023',
    image: '/badges/ibm-challenge-spring-2023.png',
    url: 'https://www.credly.com/badges/139c80ea-65a1-49fb-a071-ebeb11df29ba/public_url',
  },
  {
    name: 'IBM Quantum Challenge — Fall 2022',
    issuer: 'IBM',
    year: '2022',
    image: '/badges/ibm-challenge-fall-2022.png',
    url: 'https://www.credly.com/badges/98fd23a3-be18-4462-bdab-48e71fe0163e/public_url',
  },
  {
    name: 'QSilver',
    issuer: 'QWorld',
    year: '2022',
    image: '/badges/qsilver.png',
    url: '/certs/qsilver-diploma.jpg',
  },
  {
    name: 'QBronze',
    issuer: 'QWorld',
    year: '2022',
    image: '/badges/qbronze.png',
    url: '/certs/qbronze-diploma.jpg',
  },
];
