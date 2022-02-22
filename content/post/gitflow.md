---
title: "The Gitflow Model"
author: "Chase Percy"
type: ""
date: 2022-02-19T15:58:27+08:00
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
Vincent Driessen __|__ __[A Successful Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)__ __|__ Creative Commons BY-SA
{{% /centre %}}

{{< whiteLine >}}
The model is quite self-explanatory, the image above encompasses the simplistic nature of the model and shows how a group of aspiring
developers can easily understand the branching requirements for the project. There are times though where inexperience lead
to a few chaining monolithic branches, or merges that went against the strict policies this model has in place, but for the most part
things went smoothly.

The master and develop branches are the two branches whose lifespan is active throughout the entire project. The master branch
is production ready code, which I commonly commit to for key milestones in a 

