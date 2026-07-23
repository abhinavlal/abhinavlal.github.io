---
title: Code for today
description: YAGNI, premature abstraction, and why our biggest responsibility as developers is to create a great product today.
pubDatetime: 2015-10-01T13:44:34Z
tags:
  - software
---

> Simple is better than complex

One of the biggest problem that makes code complex is almost all of us are coding for the future. Ask yourself how many times you started writing a new feature and added things you thought will be needed later. Now think how many times you were thankful for them.

[Yagni](http://martinfowler.com/bliki/Yagni.html) requires you to write code that is needed today, most of the times it will help you keep things simple. If you need something in the future you write the code for it then. Most importantly if you are working in a startup where things are changing fast anyways, this strategy works even better.

> Don't abstract too early. Duplication is far easier to deal with than the wrong abstraction.

I looked back at few of the design decision i have made in last few years and realized i added more complexity to our products based on the fact we will need it in the future. In reality most of these future needs were based on some assumptions. Once you put these products in hand of users, you would realize few of these assumptions were wrong (everyone gets it wrong ). In hindsight when you design the system without such assumptions you can see how much simpler implementation could have been.

> Unused code is unmaintained code. A huge liability.

This does not mean that design is not important and you should write code without any thought given to quality and maintainability. Code quality and maintainability is extremely important and the focus here to minimize the number of assumptions you make while writing code. Refactoring code in future almost always improves the quality and maintainability.

As developers our biggest responsibility is to create a great product today.
