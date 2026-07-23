---
title: Worse Is Better
description: Richard P. Gabriel's design philosophy — simplicity above all — and why it matches the process I've tried to follow while building Practo.
pubDatetime: 2018-06-07T17:20:57+05:30
tags:
  - software
  - philosophy
---

Some how i stumbled across this great essay by Richard P. Gabriel called Lisp: Good News, Bad News, How to Win Big. In this article Gabriel talks about Worse is better a design philosophy for software development.

This pretty much matches the process i have tried to follow while building Practo. I am putting it here as a reminder for myself to stay true to all these points -

- Simplicity – the design must be simple, both in implementation and interface. It is more important for the implementation to be simple than the interface. Simplicity is the most important consideration in a design.
- Correctness – the design must be correct in all observable aspects. It is slightly better to be simple than correct.
- Consistency – the design must not be overly inconsistent. Consistency can be sacrificed for simplicity in some cases, but it is better to drop those parts of the design that deal with less common circumstances than to introduce either implementational complexity or inconsistency.
- Completeness – the design must cover as many important situations as is practical. All reasonably expected cases should be covered. Completeness can be sacrificed in favor of any other quality. In fact, completeness must sacrificed whenever implementation simplicity is jeopardized. Consistency can be sacrificed to achieve completeness if simplicity is retained; especially worthless is consistency of interface.

PS - Above points are taken directly from the article without any modification and the complete credit goes to Richard P. Gabriel.
