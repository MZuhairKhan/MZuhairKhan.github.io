export const profile = {
  firstName: 'Mohammad Zuhair',
  lastName: 'Khan',
  fullName: 'Mohammad Zuhair Khan',
  tagline: "Master's Student in Engineering Physics at Aalto University",
  pitch:
    'I build across quantum computing and agentic AI, and like taking research the last mile to something real.',
  availability: 'Open to research collaborations and deep-tech opportunities.',
  location: 'Espoo, Finland',
  email: 'khanmohammadzuhair@gmail.com',
  cvUrl: '/cv.pdf',
  links: {
    linkedin: 'https://linkedin.com/in/kmzuhair',
    github: 'https://github.com/MZuhairKhan',
    thesis: 'https://urn.fi/URN:NBN:fi:aalto-202406184542',
    // Fill these in if/when you have them — they render only when set.
    orcid: 'https://orcid.org/0009-0005-4351-9755' as string,
    scholar: 'https://scholar.google.com/citations?user=8f1YTpEAAAAJ' as string,
  },
  profile: [
    'Full-stack Quantum Researcher',
    'Science Communicator',
    'Research-to-impact',
  ],
  about:
    'Interested in quantum technology, agentic AI, mathematical optimisation and all things deep tech.',
  bio:
    "I'm Zuhair, from Dhaka, Bangladesh, and a fascination with quantum physics is what brought me to Aalto University, where I'm now a Master's student in Engineering Physics. I like working across the whole quantum stack, from benchmarking real hardware to the software that runs on it, and these days just as much on agentic AI and data, which I am currently working on in Lifeline Ventures. What I enjoy most is taking research the last mile into something real, from winning a commercialisation competition to founding Aalto's quantum journal club, and I try to learn something new every day.",
  quotes: [
    { text: 'In science, there are no shortcuts to truth.' },
    { text: "Tomorrow, I'll be perfect.", author: 'Dave Stieb' },
  ],
} as const;
