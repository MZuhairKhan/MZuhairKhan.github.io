export type LanguageProficiency = {
  name: string;
  level: string;
  note?: string;
};

export type ProgrammingSkill = {
  name: string;
  rating: number;
  outOf: number;
};

export const languages: LanguageProficiency[] = [
  { name: 'Bengali', level: 'C2', note: 'Native' },
  { name: 'English', level: 'C1' },
  { name: 'Finnish', level: 'A1' },
];

export const programming: ProgrammingSkill[] = [
  { name: 'Python', rating: 5, outOf: 6 },
  { name: 'LaTeX', rating: 5, outOf: 6 },
  { name: 'Scala', rating: 3, outOf: 6 },
  { name: 'MATLAB', rating: 3, outOf: 6 },
  { name: 'SQL', rating: 3, outOf: 6 },
  { name: 'R', rating: 2, outOf: 6 },
];

export const skillSet: string[] = [
  'Quantum hardware (QPUs, dilution refrigerators)',
  'Quantum SDKs (Qiskit, Cirq, Q#, Pennylane, Bloqade, QuTip)',
  'Control Software (AWGs, VNAs)',
  'Multiphysics Simulations (COMSOL)',
  'Version Control (Git)',
  'HPC & scientific computing (Triton cluster)',
];
