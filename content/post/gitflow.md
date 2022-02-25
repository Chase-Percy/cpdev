---
title: "The Gitflow Model"
author: "Chase Percy"
type: ""
date: 2022-02-13T15:58:27+08:00
subtitle: "Which branch?"
image: "/img/post/gitflow_c.png"
tags: []
bigimg: [{src: "/img/post/gitflow_c.png"}]
---

This model has been the saving grace behind all my software development projects and has saved countless hours of resolving
merge conflicts.

I was first introduced to the gitflow model during my first group project, __[Big Balls Roll]({{< ref "/project/big-balls-roll.md" >}})__, by 
my group member Peter Crabbe. Thanks to the clear and basic structure it provides for a project, it made the daunting task of learning and using git a lot more manageable.

<!--more-->

{{< spacer >}}
{{< lazyimg src="/img/post/gitflow_c.png" height="70%" width="70%" class="lazyimg" >}}
{{% centre %}}
Vincent Driessen __|__ __[A Successful Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)__ __|__ __[Creative Commons BY-SA](https://creativecommons.org/licenses/by-sa/2.0/)__
{{% /centre %}}

{{< spacer >}}
The model is quite self-explanatory; the image above encompasses the simplistic nature of the model and shows how a group of aspiring
developers can easily understand the branching requirements for the project. There are times when inexperience leads
to a few chaining monolithic branches or merges that went against the strict policies this model has in place, but things went smoothly for the most part.

The master and develop branches are the two branches whose lifespan is active throughout the entire project. The master branch
is production-ready code, although it is pushed to once a significant milestone
or requirement was achieved for my university-based projects. The develop branch is where all approved branches rejoin the larger codebase, and new feature branches
are created. The development branch can quickly get hundreds of commits ahead of the master branch, so it is vital to plan
milestones ahead of time and allocate sufficient testing so that the master branch can stay relatively up to date.

Feature branches are used to add new functionality to the software in an isolated branch independent of other 
feature branches. Several branches can be worked on simultaneously, with each adding code that should not affect any existing
code in the project.

In addition to these main branches, several 'fix' branches are often created within projects I have worked on instead of having a separate
release branch. This is primarily due to the nature of university projects where there is usually only one release, the final product. These
fix branches are small and only fix one issue at a time to minimise challenges finding where code broke further into the project.

While this model may not be the most optimal, it has served very well for the scope of my past projects. It has provided
a solid foundation from which me and others I have worked with could form a solid structure for our group projects and ensure that we
were all on the same page with the branching process.

For a more detailed explanation, you can read the original article here: __[A Successful Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)__
