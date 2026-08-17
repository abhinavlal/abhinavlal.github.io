---
title: Tech Debt Is a Choice. Mess Is Not.
description: Tech debt is an intentional shortcut. Mess is poor execution. Both used to be limited by human attention — AI removes that limit on both sides.
pubDatetime: 2026-08-17T10:00:00+05:30
featured: true
tags:
  - engineering
  - ai
---

> Tech debt is an intentional shortcut. Mess is poor execution. Managing debt and stopping mess both used to be limited by human attention. AI removes that limit on both sides.

## The distinction

About six years ago I started making a distinction internally at Practo. Ask most engineers what tech debt is and they get it wrong. They describe code they wrote badly in a hurry and call it debt. That is not debt. I was in a hurry and wrote bad code is not tech debt. I made a design choice knowing it won't scale, because validating the idea today mattered more, is tech debt.

One is a decision. The other is an accident. The cures are opposite. Debt is managed. Mess is stopped.

Debt has a story. You borrowed for a reason: the outcome was uncertain, or speed mattered more than the durable design that day. The interest is concrete. The feature that should take five days now takes seven, and those two days are the payment, every time anyone touches that module. Often the honest arithmetic says keep paying. If the principal costs more than the interest, carrying the loan is the right call.

Mess has no story. Someone was in a hurry, wrote something nobody understood, and the system absorbed it. Nobody borrowed anything. Nobody agreed to repayment terms. Calling it debt gives it too much dignity.

The framework held up. What I struggled with for years is that both halves of it depended on human attention, and human attention doesn't scale.

Stopping mess required constant rigor. Good code in a large team is intentional. It happens by itself in a three-person team, and everyone assumes that will scale. It won't. It survives through senior engineers treating review as a responsibility instead of an assigned task, calling out smelly code, holding the line on every pull request. A few people carrying the burden for everyone. At Practo we had periods where we managed this well and periods where we failed miserably. The difference was never tooling. It was whether the reviewers had the energy to keep caring.

Repaying debt had the same limit. The lump-sum fix, two clean weeks to do it properly, needs management convinced and product negotiated. It rarely happens. What works is EMIs: improve the thing 20% every time you touch it. But chipping away is tedious. The problem is still there five months later, and nobody gets kudos for paying 20% of principal. I watched people give up. I gave up myself at times. I said for years that I had no answer for the incentives.

## What AI changes

The common worry is that AI generates mess at volume. It can. But look at where the framework actually broke. It broke where discipline had to be paid for in human attention. That is exactly the cost AI removes.

Start with mess. A human reviewer's quality is a graph. It depends on which side of the bed they woke up on and what they had for breakfast. Nobody reviews the four-hundredth pull request with the attention they gave the fourth. A model does. Every line, every change, the same standards, no fatigue, no need for recognition. Stopping mess used to be a cultural achievement. It was fragile, it depended on a few people, and it degraded every time one of them burned out or left. It can now be a system property, enforced at the source, on every change. If your quality still depends on hero reviewers, you are solving a problem that no longer needs heroes.

Now the debt side. Two things change at once.

First, you should borrow less. The case for a shortcut was always speed. Doing it right costs five days, the hack costs two, and the bet is uncertain. When AI brings the cost of doing it right close to the cost of the hack, most shortcuts stop being worth taking. Debt becomes something you take only when absolutely necessary, not the default posture of a team under pressure.

Second, the repayment can be automated. The EMIs never failed because the arithmetic was wrong. They failed because the chipping was tedious, invisible, and unrewarded, so humans stopped doing it. None of those constraints apply to an agent. The 20% improvement on every touch. The migration everyone agreed was right and nobody had time for. The refactor that pays principal on a loan taken three years ago. This is exactly the work you can now hand off, continuously, in the background, without carving out a sprint. My unsolved incentive problem didn't get solved. It got removed. Agents don't need kudos.

The arithmetic flips with it. For a decade the honest answer was: keep paying the interest, the principal is too expensive. When the principal gets cheap, loans that were rational to carry become rational to close. Go through the debt your team has lived with for years and reprice it. Some of it stopped being worth carrying the day repayment stopped needing your engineers' time.

## The condition

None of this happens by default. Point AI only at generating features and you get volume without discipline: more code than anyone reviews, shipped faster than anyone understands it. That is mess at a scale no human team has produced before. The tools amplify whichever side you aim them at.

So aim them. Put the tireless reviewer on every change, not just the ones humans get to. Hand the EMIs to agents and let principal get paid while your team builds. Keep debt for the rare bet that genuinely can't wait, and name it when you take it.

The distinction hasn't changed in six years. What changed is the cost of the discipline. Debt is still a choice. Mess is now one too.
