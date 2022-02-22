---
title: "Big Balls Roll"
author: "Chase Percy"
type: "page"
date: 2021-11-13T16:45:38+08:00
subtitle: "ICT289 Project"
image: ""
tags: []
bigimg: [{src: "/img/bbr/banner.png"}]
---

{{< lazyimg src="/img/bbr/icons.png" class="lazyimg" title="C | LUA | CMAKE | GITHUB" >}}

{{< whiteLine >}}

{{< centreText h="2" >}}
 A Marbles and monkey ball inspired game
{{< /centreText >}}
{{< youtube 2XUEb0cKoXo >}}
{{< whiteLine >}}
{{< line >}}
{{< whiteLine >}}
{{< centreText h="2" >}}
Development Team
{{< /centreText >}}

{{% centre %}}
Peter Crabbe  
Matthew Davis  
Chase Percy  

{{< whiteLine >}}

## Source Code
__[Big Balls Roll Repo](https://github.com/MajorArkwolf/BigBallsRoll)__

{{< whiteLine >}}

## Project Planning and Tools
{{% /centre %}}

{{< columns >}}
- Weekly meetings
- Kanban Board
- Git with GitHub for source control
  - Git flow model
  - Git LFS
  - Branch Protection

{{< column >}}
- CI/CD
  - Travis CI (1/2 the unit)
  - Jenkins (1/2 the unit)
  - Static Analyzer (CPPCheck)
  - Automated unit tests
- Doxygen
- LLVM Style Guide

{{< endcolumns >}}

{{< whiteLine >}}

{{< lazyimg src="/img/bbr/kanban.png" class="lazyimg" >}}
{{< whiteLine >}}
{{< line >}}
{{< whiteLine >}}
{{% centre %}}
## Features developed by me
{{< whiteLine >}}
### Texture Manager

A simple texture manager that was responsible for loading textures 
dynamically during runtime and through preloading at engine start 
up. The manager was responsible for storing texture ID's and providing them
when a texture was requested. __[STB_IMAGE](https://github.com/nothings/stb/blob/master/stb_image.h)__ was used to load textures from PNG and JPG filetypes.
{{< whiteLine >}}
{{< lazyimg src="/img/bbr/tm.png" class="lazyimg" >}}
{{< whiteLine >}}


### Physics Debug Renderer

A debug renderer to show the Bounding boxes of the physics objects
within the scene. A vector data structure was implemented so that
debug data could be inserted dynamically without having to first check
the number of collision bodies were in the scene.
{{< whiteLine >}}
{{< lazyimg src="/img/bbr/debug.png" >}}
{{< whiteLine >}}


### GUI

The GUI was implemented using the __[Nuklear](https://github.com/Immediate-Mode-UI/Nuklear)__ immediate mode GUI 
library. With minimal documentation it was quite a challenge to implement, and at multiple times I was required to read 
through hundreds of lines of source code to figure out why something wasn't behaving as expected.
{{< whiteLine >}}
{{< lazyimg src="/img/bbr/gui.png" class="lazyimg" >}}
{{< whiteLine >}}

### Skybox

The skybox was implemented by creating a 1x1 cube around the camera and applying a texture to each of the internal
faces of the cube. The location is translated along with the camera every frame so that the player is always able to see it.
The final requirement was to render the cube first per frame and with the depth buffer disabled so that all other objects
drawn appear in front of it.
{{< whiteLine >}}
{{< lazyimg src="/img/bbr/skybox.png" class="lazyimg" >}}
{{< whiteLine >}}


### Game Logic (Partial)

The game logic was implemented using LUA and allowed us to use LUA's table structures to have a form of class like data structures.
I helped Peter implement game logic, such as level transitions and ball movement/control. I also created scripts 
for in-game menu interactions/HUD, scoring, and polish such as models in the game.
{{< whiteLine >}}
{{< lazyimg src="/img/bbr/logic.png" class="lazyimg" >}}
{{% /centre %}}