---
title: "IonQ Challenge — MIT iQuHACK 2025"
date: 2025-02-01
description: "IonQ's Max-Cut ('mosh-pit') challenge at MIT iQuHACK 2025, targeting trapped-ion hardware."
repo: "https://github.com/MZuhairKhan/2025-IonQ"
tech: ["Quantum", "IonQ", "Max-Cut"]
status: archived
order: 10
thumb: "/thumbs/ionq.png"
logo: "/logos/mit-iquhack.png"
subLogo: "/logos/ionq.png"
subLogoAlt: "IonQ"
---

Our attempt at IonQ's Max-Cut challenge, the "mosh-pit" problem, at MIT iQuHACK 2025. Instead of the usual QAOA, we used **varQITE** (variational quantum imaginary-time evolution, developed by IonQ and Oak Ridge): the Max-Cut cost is written as a sparse Pauli operator over a NetworkX graph, and the state is evolved in imaginary time to settle toward the lowest-energy cut. Built on Qiskit and Aer and run through qBraid (with a Colab path too), targeting IonQ's Forte system. Built with David Zehner, Filip Miljević, Emre and Vadim Karpusenko.
