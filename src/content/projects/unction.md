---
title: "Junction Quantum Hack — QMill Challenge"
date: 2026-06-07
description: "Our QMill-challenge solution at Junction's Quantum Hack 2026 — a QASM toolkit that estimates a circuit's peak bitstring, classically simulates peaked circuits, and optimises them with equivalence checking. Voted top 5 by audience vote and presented to the jury for the main prize."
repo: "https://github.com/Pejman712/Quantum_hack_unction"
tech: ["OpenQASM", "Qiskit", "MPS", "Circuit Optimisation"]
status: archived
featured: true
order: 3
thumb: "/thumbs/junction-quantum-hack.jpg"
award: "Junction Quantum Hack · Top 5"
---

Our team's toolkit for **QMill's challenge** at **Junction's Quantum Hack 2026** (Espoo), where we were voted into the **top 5 by audience vote** and presented to the jury for the main prize. The challenge was about *peaked* circuits, quantum circuits whose output piles up on a single bitstring, and the task was to find that bitstring and to simplify the circuits that produce it.

The toolkit loads OpenQASM circuits and **estimates the peak bitstring** two ways: exactly, by dense statevector simulation for small circuits, and approximately, by **matrix-product-state (MPS) sampling** with majority-vote distillation for circuits too large to simulate directly. It then **optimises** a circuit by stripping redundant boundary rotations, snapping near-grid angles to multiples of π/8, and transpiling to an `rx`/`rz`/`cx` basis, and **proves** the result equivalent to the original with MQT QCEC (accounting for global and relative phase). It reports the before/after gate count and depth, plots the measurement distributions, and ships with 49 test circuits across five difficulty tiers. Built on Qiskit and Qiskit Aer (Python 3.12+, pytest, Ruff).

My part was the MPS peak-bitstring solver, the batch CLI, and the scripts for running it on the LUMI supercomputer. Built with Pejman Habibiroudkenar and Tung Bui Dang.

Code: [Unction toolkit](https://github.com/Pejman712/Quantum_hack_unction) · [peaked-circuit simulation](https://github.com/Pejman712/Quantum_Peak).
