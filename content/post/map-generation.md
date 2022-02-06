---
title: "Map Generation"
author: "Chase Percy"
type: ""
date: 2022-01-24T16:43:11+08:00
subtitle: "Creation From An Idea"
image: ""
tags: []
---

## The Requirements
- Design a random map generation algorithm to provide playability for the player.
- The algorithm had to be fast enough to not hinder gameplay with excessive load times.
- It had to work with the AI component that was still under development.
  - Wall locations and dimensions.
  - Entities/Obstacles within each room.
  - Door locations and information about connected corridors.
  - A guarantee that all rooms were accessible and that the AI and player could navigate between doors without being obstructed.
- It had to be completed within a limited timeframe (2 weeks) alongside other game developments.
- Allow different art assets to be swapped out easily.
<!--more-->

## The Process

### Planning
With limited time and a goal that I wasn't sure was possible, I decided that starting with the random generation of a 
single room would be a good place to start. The reason I started smaller, was to treat it as proof of concept and to
judge if it was possible within the time constraints.

I decided that a grid based approach would be ideal, as the assets we were using for dungeon creation were modular by design. 
Another advantage with a grid based system was how easily it would be to generate the required data for the AI. Since the
game only required information about the X and Z axis, the map data was easy to store in 2D arrays. Passing the data in 2D arrays
to be processed by the AI gave us a simplified data structure that required no forward declarations for either component.

Room generation was to be handled by a room object that creates itself given a set of parameters.   
These included:
- Width/Height.
- Percentage of the floor to fill with obstacles.
- Percentage of the walls to decorate.
- An array of model smart pointers to be used for the objects that make up the room (walls, props, etc.).
- 

### Development
The first step was to 