---
title: "QFT Quantum Adder"
date: 2023-09-28
description: "A quantum adder built on the Quantum Fourier Transform, following the Ruiz-Pérez & García-Escartín construction."
repo: "https://github.com/MZuhairKhan/QFT-Quantum-Adder"
tech: ["Quantum", "Qiskit", "Python"]
status: archived
order: 11
thumb: "/thumbs/qft-quantum-adder.png"
---

A Fourier-basis quantum adder, following the construction of Lidia Ruiz-Pérez and Juan Carlos García-Escartín ([arXiv:1411.5949](https://arxiv.org/abs/1411.5949)). Instead of the carry logic a classical adder needs, numbers are encoded into the phases of a register with the Quantum Fourier Transform, added with controlled phase rotations, and transformed back out. The repository works through the construction.
