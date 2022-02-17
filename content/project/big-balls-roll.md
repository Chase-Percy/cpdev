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

{{< line >}}

{{< centreText h="2" >}}
Development Team
{{< /centreText >}}

{{% centre %}}
Peter Crabbe  
Matthew Davis  
Chase Percy  

{{< whiteLine >}}

## Repo
__[Big Balls Roll](https://github.com/MajorArkwolf/BigBallsRoll)__

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

{{< line >}}

{{% centre %}}
## Features developed by me
{{< whiteLine >}}
### Texture Manager

A simple texture manager that was responsible for loading textures 
dynamically during runtime and through pre-loading at engine start 
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
library.
{{< whiteLine >}}
{{< lazyimg src="/img/bbr/gui.png" class="lazyimg" >}}
{{< whiteLine >}}


### Skybox

A simple skybox that was rendered in a 1x1 cube around the players 
camera and drawn first in the scene with depth off.
{{< whiteLine >}}
{{< lazyimg src="/img/bbr/skybox.png" class="lazyimg" >}}
{{< whiteLine >}}


### Game Logic (Shared)
I Helped Peter implement game logic in LUA, such as level transitions and ball movement and control.
I Added scripts for in-game menu interactions/HUD, scoring, and polish such as models in the game.
{{< whiteLine >}}
{{< lazyimg src="/img/bbr/logic.png" class="lazyimg" >}}
{{% /centre %}}