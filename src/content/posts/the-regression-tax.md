---
title: The Regression Tax
description: Every capability leap pays a regression tax. You can't avoid the tax, but you can choose who pays it.
pubDatetime: 2026-07-18T10:00:00+05:30
tags:
  - software
  - engineering
---

> Every capability leap pays a regression tax. You can't avoid the tax, but you can choose who pays it.

Apple just shipped the iOS 27 public beta with Siri AI, a ground-up rebuild of a fourteen-year-old assistant. The new Siri is dramatically more capable. The early betas are also full of regressions on things the old one handled without thinking. Watching the largest company in the world run this cycle across billions of devices prompted me to finally write down a pattern I have lived through many times.

Between Practo Ray v2 and v7, we shipped five major version leaps. Each one made the product meaningfully more capable. And each one, every single one, regressed things that had worked reliably for years. Not because we were careless. We knew the pattern by the second release and threw very hard effort at preventing it. It didn't matter. We regressed 100% of the time.

For years I treated this as a failure of execution. I now think it's a tax. It's owed on every capability leap, and no amount of engineering effort gets you an exemption. Effort buys you a lower rate. Fewer regressions, caught earlier. The bill never goes to zero.

## Why the tax exists

Reliability is not a property of a system. It is earned one operational hour at a time, and it cannot be designed in upfront.

Joel Spolsky made this point in 2000, writing about the Netscape rewrite. Old code looks ugly because every weird conditional is a bug fix. That two-line hack handling one clinic's strange billing configuration is not cruft. It's knowledge. Someone hit that case, someone diagnosed it, someone fixed it. A mature codebase is a ledger of everything the real world has thrown at the product.

Gall's Law says the same thing from the other side. A complex system that works has invariably evolved from a simple system that worked. A complex system designed from scratch never works.

A capability leap swaps out the substrate that years of accumulated fixes were tuned to. Some of those fixes become irrelevant. Some become actively wrong. Most simply don't exist yet for the new foundation. The design may be better, but the earned reliability is gone. The tax comes due as your users rediscover, one by one, problems you solved years ago.

## The papercuts are known

Here is what makes the second climb different from the first: you have the map.

The first time, you discovered every edge case expensively, in production, from angry users. The second time they are all written down. Look at your bug tracker, your test suite, your support tickets. Everything the new system needs to relearn is already in there.

This should make the second climb dramatically faster, if you treat the old system's fix history as an asset instead of legacy cruft. The teams that pay the lowest rate mine that history before the leap, convert it into regression tests and behavioral contracts, and point them at the new system from day one, while the old system is still running and can serve as the oracle. The teams that pay the highest rate treat the rewrite as a clean break and let users rediscover years of papercuts one at a time.

Most teams do the second thing. The same optimism that motivates the leap, that the new architecture makes those old problems impossible, also motivates discarding the ledger. Some old problems genuinely become impossible. Most just become unfixed.

## Choose who pays

After enough Ray releases, we stopped trying to avoid the tax and started deciding who paid it. The solve that worked: let tech-forward users who understood the risk opt into the new version early. They got the capability leap first, they knew the trade they were making, and they surfaced the regressions while the bulk of our users stayed on the version that had already earned their trust. By the time everyone else moved, most of the tax had been paid, by people who had priced it in.

This is the reframe that matters. The operational hours cannot be skipped, but they can be allocated. Apple's public beta is the same move at their scale. The regressions are real, but they land on people who signed up for them.

Three implications if you are planning a leap:

**Put the tax on the invoice.** The question is not "is the new architecture better?" It is "better by more than the regression tax we're about to pay, over the time it takes to pay it?" Often yes. But make it a conscious trade, not a surprise in the release retro.

**Claim the deduction.** Refinement embedded in old code doesn't transfer. Refinement expressed as regression tests and documented invariants does. Do the conversion while the old system still exists to serve as the oracle.

**Choose who pays.** Don't spread the tax across your whole base. Segment by risk appetite, let consenting early adopters absorb the regressions, and move everyone else after the bill is mostly settled.

The leap is usually worth it. Just stop budgeting as if it were free.
