---
title: "Reform — Startup Idea Validator"
date: 2026-03-23
description: "The Startup Idea Validator — a local-LLM app that pressure-tests an early-stage idea before you build it."
repo: "https://github.com/MZuhairKhan/Reform"
tech: ["Python", "Streamlit", "Ollama", "LLM"]
status: archived
order: 4
thumb: "/thumbs/reform.png"
---

Reform is a startup-idea validator that runs entirely on a local language model. You point it at your **Ollama** endpoint (it defaults to `llama3.2:3b`), run `streamlit run gui.py`, and describe your idea. Rather than cheering you on, the model plays an investor and a sceptical customer and asks the awkward questions: who is the competition, how will you price it, will anyone actually pay. The aim is to find the weak points in a concept before you write a line of product code, and keeping the model local means a half-formed idea never leaves your machine.
