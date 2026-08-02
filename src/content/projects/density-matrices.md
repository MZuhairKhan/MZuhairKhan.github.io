---
title: "Density Matrices"
date: 2024-01-18
description: "A tested Python toolkit for density matrices — construction, partial traces and related operations, with unit tests and coverage."
repo: "https://github.com/MZuhairKhan/Density-matrices"
tech: ["Python", "Quantum", "Pytest"]
status: archived
order: 7
thumb: "/thumbs/density-matrices.png"
---

A small, tested Python library for density matrices, the objects that describe mixed quantum states. You can build a `DensityMatrix` from a state vector or a raw matrix (with normalisation), and it checks the properties that should hold: Hermitian, positive semidefinite, square. On top of that it implements the operations you actually reach for, including **partial traces**, purity and a pure-state check, time evolution, the eigensystem, measurement probabilities, Uhlmann fidelity between two states, and von Neumann entropy. Each one is covered by unit tests, so the operators are verified rather than just sketched.
