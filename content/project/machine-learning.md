---
title: "Machine Learning"
author: "Chase Percy"
type: "page"
date: 2022-06-29T12:23:31+08:00
subtitle: "Learning Through Reinforcement"
image: ""
tags: []
bigimg: [{src: "/img/ml/Banner.png"}]
---
{{< lazyimg src="/img/ew/icons.png" class="lazyimg" title="C# | GITHUB | UNITY" >}}

{{< spacer >}}

{{< centreText h="2" >}}
 A self-driving simulation
 {{< spacer >}}
{{< /centreText >}}
{{< youtube MJE32SlqMwc >}}
{{< spacer >}}
{{< line >}}
{{< spacer >}}

{{% centre %}}

## Project Planning and Tools
{{% /centre %}}

{{< columns >}}
- __[Unity ML](https://unity.com/products/machine-learning-agents)__
- Doxygen 
- Trello

{{< column >}}
- Git with GitHub for source control
  - __[Git Flow Model]({{< ref "/post/gitflow.md" >}})__
  - Git LFS

{{< endcolumns >}}

{{< spacer >}}

{{% centre %}}
## Overview

This is a project I implemented over my semester break as a introduction to Machine Learning (ML). The
project uses the __[Unity Machine Learning Framework](https://unity.com/products/machine-learning-agents)__
and is implemented through the Unity Editor.

The goal of the project was to train a neural network to navigate around any racetrack without crashing and
in the fastest time possible. I began by making a random racetrack generator as I didn't want the ML Agent to learn
to race one racetrack instead of how to navigate between the barriers of any racetrack. Once this was completed
I created the vehicle and began verifying that the tracks were possible to complete, and since this was possible I knew 
that it would be possible to train an AI to race the track.

I then began the process of understanding what information to provide the ML Agent so that it could best navigate the
racetracks. After some testing I found that providing a normalized velocity and 8 ray-casts that project from the front
and sides of the vehicle provided it with adequate information to navigate the tracks and not overwhelm it. 

To incentivise the ML Agent to navigate the track and learn the desired behaviours I set two reward parameters. The first reward was a small
amount given based on its current speed to encourage it to go as fast as possible. The second was from checkpoints on the
racetrack which were triggered when the vehicle passed through them, these gave the most rewards and encouraged it to keep
going around the track.

After getting the rewards and information correct I began training the neural network using 25 cloned ML Agents. These all
learnt in parallel and all used the same neural network, greatly speeding up the training process. It took 2 hours for the neural
network to race around the track, and it continued for 10 hours until it was comfortable navigating a large variety of tracks.

{{< spacer >}}
{{< lazyimg src="/img/ml/stats.png" class="lazyimg" >}}

{{< spacer >}}

The above image shows the reward over time (steps) and how the ML Agent progressed as it learnt, with each 5 million steps
took around 1 hour. The dip at around 34 million steps was when the size of the racetracks increased, allowing the AI to go
faster on long straights, which meant it had to learn to slow down properly to turn the corners at the end of the straight.

{{< spacer >}}

### Random Racetrack Generation

To help train the neural network to race any type of racetrack I implemented an algorithm to create
random racetracks that are regenerated everytime the AI crashes the car. The algorithm uses a grid system
and places specified amount of points within the grid. The points are ordered in clockwise order and then
connected using the A* pathfinding algorithm.

A demo of the pathfinding algorithm can be found here: __[A* Pathfinding Demo]({{< ref "/algorithms/a_star.md" >}})__

This information was then used to instantiate new straight and corner racetrack prefabs, and orientating them
based on the last and next nodes position on the grid.

{{< spacer >}}
{{< lazyimg src="/img/home/ml.png" class="lazyimg" >}}
