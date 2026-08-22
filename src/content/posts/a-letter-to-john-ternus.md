---
title: A letter to John Ternus
description: Apple's original play — package the component, expose what only you hold, pay the people who build on it — is open again. AI is the component this time.
pubDatetime: 2026-08-22T12:30:00+05:30
featured: true
tags:
  - ai
  - apple
---

Dear John,

Congratulations. You take over in ten days, and you will spend your first year being asked about Siri. Answer politely. Siri is a product, and products get fixed in release cycles. I am writing about a platform decision. Platform decisions determine decades, and this one determines whether Apple gets to run its own play again.

The play was never inventing the component. Apple did not invent multi-touch, the accelerometer, the GPS chip, or the camera sensor. The iPhone did three things with components that already existed. It packaged them into one device. It exposed them to developers through APIs nobody else offered. And it set economics under which a stranger with an idea could get paid. All three, together, are why a phone became a scanner, a bank, a taxi dispatcher, a medical device, and why the component makers captured almost none of that value while the platform captured most of it.

AI is the component this time, and the same three moves are open. So far Apple has made one of them.

Start with why the opportunity is still open at all. Consumer software worked for two decades because one additional user cost the developer approximately nothing. That single property is why free tiers existed, why one person could serve a hundred thousand people without a finance function, why the App Store exploded. AI broke it. Every interaction costs money on a server, the cost does not amortize, and it scales with engagement and success, the two things a consumer product exists to maximize. The better the product works, the worse the developer's position gets. Watch what the frontier labs did when they hit this wall. They drifted to enterprise, where a company pays the bill and the unit economics are someone else's problem. The labs did not lose the consumer market. They walked away from it. There is still no breakout consumer AI product built by a developer, and the reason is not imagination. It is that no developer can fix the economics alone. The fix requires someone who already has a billing relationship with a billion consumers, a device in their pocket, and their trust. Only one company has all three.

And in June, your team made the first move. A developer can now switch from the on-device model to a server model on Private Cloud Compute with one line. No API keys, no auth, no token bill for the developer. The requests meter against the user's iCloud account. Whoever designed that understood exactly where the token cost has to live: with the consumer, inside an account they already pay. That is the meter, and it is the right meter.

But a meter is not a platform. Three things are missing, and they map onto the three moves of the original play.

The first is intelligence worth building on. The server model behind Private Cloud Compute today offers thirty-two thousand tokens of context, shared between input and output. That is a summarizer. It cannot hold a working session, a family's schedule, a health history, a semester of coursework. The frontier labs optimize their best models for coding and enterprise work because that is where the revenue is. The model consumer products need is fast, personal, multimodal, and long on context. Right now that model is nobody's first priority. It does not have to be Apple's own model. Host strong open-weight models inside the Private Cloud Compute boundary with real context windows and let developers choose. The iPhone never had the best camera sensor on the market. It had a good one, packaged better than anything else.

The second is the component only Apple has. The iPhone's APIs mattered because they exposed things developers could not get anywhere else: the accelerometer, the GPS, the camera. The AI equivalent is not the model. Models are everywhere. It is the user's context, their messages, their photos, their calendar, their health data, what is on their screen right now. Apple Intelligence uses this today, but only for Apple's own features. No developer can touch it, and no other company could offer it, because no one else has the attestation architecture to process data without seeing it. Personal context is the new accelerometer. An assistant that knows nothing about me is a toy. Only you can let a developer build one that knows me without the developer ever seeing me.

The third is the economics, and this is the move I most want you to see. Today Apple treats tokens as a cost to contain. The developer program is capped at two million downloads, access terminates on success, and every user's daily allowance is pooled across apps and visible to none of them. All of that follows from one accounting decision: tokens sit on the cost line. Move them to the revenue line and everything inverts. Sell compute the way you sell storage, a number a person owns, watches, and buys more of. Nobody believed consumers would pay monthly for invisible gigabytes either. Then share that revenue with the apps that caused the consumption. When an app drives a user to buy tokens, the developer gets a share of what they generated. The App Store took a commission on software, and an economy grew on top of it. This is the same alignment. Every developer becomes a reason for consumers to buy Apple compute, and Apple's incentive flips from containing usage to growing it. Under those economics I do not need to argue against the download cap. It falls on its own. You do not cap your own salesforce.

Notice what is not on this list. It does not matter this decade whose GPUs the tokens run on. Rent from Google, from NVIDIA, from anyone who clears the bar this year. Your silicon team will keep pulling work onto the device, where marginal cost rounds to zero, and an inference chip makes the cloud side cheaper whenever it arrives. Those curves all bend your way on their own. The window will not wait. Google can copy every mechanism in this letter, and it reaches more devices. What Google has less of is a population in the habit of paying Apple monthly for something invisible, and a brand that lets people hand over their personal context. Both are real. Neither is permanent.

The play is sitting there, John, and it is the same play. Package the component. Open up what only Apple holds. Pay the people who build on it. The developers who will define consumer AI are out there right now, watering down their best features to survive their token bills, and every one of them would rather be selling your compute for a share of it.

You already built the meter. Now pay the people who make it run.

Regards,
Abhinav
