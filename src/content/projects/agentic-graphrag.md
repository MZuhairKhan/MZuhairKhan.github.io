---
title: "Agentic GraphRAG for Tax Research"
date: 2026-05-24
description: "Agentic GraphRAG over live Finnish tax regulation — graph-based reranking on top of dense retrieval, built for the Taxxa AI challenge."
repo: "https://github.com/MZuhairKhan/aalto-hackaton-2026"
tech: ["Python", "GraphRAG", "Pinecone", "LLM"]
status: archived
order: 4
thumb: "/thumbs/agentic-graphrag.png"
---

An agentic GraphRAG system for answering real Finnish accounting and tax questions over live regulation from Finlex and the Tax Administration (Verohallinto). Plain top-k retrieval struggles with law, where rules cross-reference one another and are constantly amended or repealed, so we built a graph over the corpus and used it to rerank.

The pipeline chunks the source HTML structurally (a set of nine splitters that respect the document layout), embeds it, and builds a typed graph whose edges encode real legal relationships: amends, repeals, transposes, references, interpreted-by. Retrieval is hybrid, a dense cosine score plus a graph-neighbourhood boost (`score = cosine + α·graph_boost`), so a passage gains weight when its neighbours are relevant and current rules are favoured over superseded ones. Because the regulation is in Finnish and questions often come in English, a cross-lingual step lifts retrieval similarity from 0.796 to 0.861. We graded the system on 83 question-answer pairs and compared embedding models (bge-m3 and multilingual-e5 in three sizes), with the corpus of 121,046 chunks published to Pinecone.

I built the graph and the graph-based reranking, the baseline top-k RAG to measure against, and the embedding and diagnostics pipeline. Made over a weekend for the Taxxa AI challenge at Aalto's Prompt Finance Hackathon.
