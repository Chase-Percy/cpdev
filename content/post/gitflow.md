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
my group member Peter Crabbe. It made the daunting task of learning and using git a lot more manageable, thanks to the clear
and basic structure it provides for a project.

<!--more-->

{{< whiteLine >}}
{{< lazyimg src="/img/post/gitflow_c.png" height="70%" width="70%" class="lazyimg" >}}
{{% centre %}}
Vincent Driessen __|__ __[A Successful Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)__ __|__ __[Creative Commons BY-SA](https://creativecommons.org/licenses/by-sa/2.0/)__
{{% /centre %}}

{{< whiteLine >}}
The model is quite self-explanatory, the image above encompasses the simplistic nature of the model and shows how a group of aspiring
developers can easily understand the branching requirements for the project. There are times though where inexperience lead
to a few chaining monolithic branches, or merges that went against the strict policies this model has in place, but for the most part
things went smoothly.

The master and develop branches are the two branches whose lifespan is active throughout the entire project. The master branch
is production ready code, although for my university based projects it is pushed to once a major milestone
or requirement has been reached. The develop branch is where all approved branches filter into and where new feature branches
are created from. The develop branch can easily get hundreds of commits ahead of the master branch, so it is vital to plan
milestones ahead of time and allocate sufficient testing so that master can stay relatively up to date.

Feature branches are used to add new functionality to the software in an isolated branch that is independent of other 
feature branches. Several of these branches can be worked on simultaneously, with each adding code that should have no effect on any existing
code in the project.

In addition to these main branches, several fix branches are often created within projects I have worked on instead of having a separate
release branch. This is primarily due to the nature of university projects where there is usually only one release, the final product. These
fix branches are very small and only fix one issue at a time, so to minimise challenges finding where code broke further into the project.

While this model may not be the most optimal, it has served very well for the scope of the projects I have worked on. It has provided
a solid foundation from which me and others I have worked with could form a solid structure for our group projects and ensure that we
were all on the same page with the branching process.

For a more detailed explanation, you can read the original article here: __[A Successful Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)__

