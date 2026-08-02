---
title: "Womanium Hackathon — IQM Challenge"
date: 2022-08-01
description: "Team WinQC's solution to IQM's Digital-Analog VQE challenge (Womanium 2022) — a VQE for an Ising Hamiltonian on DAQC. Finalist."
repo: "https://github.com/MZuhairKhan/iqm-academy-womanium-hackathon-DAQC-VQE"
tech: ["Quantum", "VQE", "DAQC"]
status: archived
order: 6
thumb: "/thumbs/daqc-vqe.png"
logo: "/logos/womanium.png"
award: "IQM Hackathon · Finalist"
---

Team **WinQC**'s entry for the Digital-Analog Quantum Computing (DAQC) VQE challenge set by **IQM Quantum Computers** at the Womanium Hackathon 2022, which reached the finalist stage. We built a Variational Quantum Eigensolver for the hydrogen molecule (H₂, mapped to two qubits with the Jordan-Wigner transformation) in the digital-analog paradigm, where the circuit alternates fast analog Ising-interaction blocks with digital single-qubit gates rather than using two-qubit gates throughout.

Optimising with SPSA and adding measurement-error mitigation, the digital-analog approach reached a ground-state energy error of about 0.0046, roughly an order of magnitude better than the digital-only baseline at about 0.0148. Built with Nikolas Klemola Tango, Tereza Visková, César Bertoni Ocampo and Shilan Abo; I gave the final pitch.
