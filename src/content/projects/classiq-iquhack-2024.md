---
title: "Classiq Challenge — MIT iQuHACK 2024"
date: 2024-02-01
description: "Team submission to Classiq's Generalized Arithmetic challenge at MIT iQuHACK 2024, built on the Classiq platform."
repo: "https://github.com/MZuhairKhan/2024_Classiq"
tech: ["Quantum", "Classiq", "Qmod"]
status: archived
order: 9
thumb: "/thumbs/classiq.png"
logo: "/logos/mit-iquhack.png"
subLogo: "/logos/classiq.png"
subLogoAlt: "Classiq"
---

Our team's submission to Classiq's **Generalized Arithmetic** challenge at MIT iQuHACK 2024, built on Classiq's platform and Qmod SDK. The task was to realise a function (tanh) as a quantum circuit; we approximated it with a Chebyshev fit split across two intervals, [0, 0.5] and [0.5, 1], for accuracy, then let Classiq synthesise and optimise the circuit under explicit width, depth and timeout constraints. We took it through two stages, an 8-bit version at circuit depth 189 and a 25-bit version at depth 352. Built with Niko Cambareri, Emanuele Serrati, Rihab Hoceini and Hyunkyung Choo.
