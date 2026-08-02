---
title: "Alphapolis — IMC Prosperity 3"
date: 2025-04-01
description: "Algorithmic trading bots for IMC's Prosperity 3 — a multi-round market-making and trading competition. Ranked 25th in Italy."
repo: "https://github.com/MZuhairKhan/Alphapolis"
tech: ["Python", "Algorithmic Trading", "Market Making"]
status: archived
order: 9
thumb: "/thumbs/prosperity-3.jpg"
award: "IMC Prosperity 3 · 25th in Italy"
---

My team's trading algorithms for **IMC's Prosperity 3**, a multi-round challenge that mixes market-making, directional trading and combinatorial puzzles. We finished **25th in Italy**.

We ran a different strategy per product: an EMA-based market maker for the steadier instrument (KELP), a momentum bot for the noisier one (SQUID_INK) with a 4% stop-loss and 6% take-profit, and a pairs/basket arbitrage on the composite product (PICNIC_BASKET) against its components, using AR(1)+GARCH(1,1) z-scores with a ±3.5σ entry band. The bots managed inventory and position limits while reacting to order flow, and we iterated them round to round against the `prosperity3bt` backtester. Built with [Niko](https://github.com/Niko-mc).
