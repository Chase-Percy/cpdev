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

{{< spacer >}}

{{< centreText h="2" >}}
 A Marbles and monkey ball inspired game
 {{< spacer >}}
{{< /centreText >}}
{{< youtube 2XUEb0cKoXo >}}
{{< spacer >}}
{{< line >}}
{{< spacer >}}
{{< centreText h="2" >}}
Development Team
{{< /centreText >}}

{{% centre %}}
Peter Crabbe  
Matthew Davis  
Chase Percy  

{{< spacer >}}

## Source Code
__[Big Balls Roll Repo](https://github.com/MajorArkwolf/BigBallsRoll)__

{{< spacer >}}

## Project Planning and Tools
{{% /centre %}}

{{< columns >}}
- Weekly meetings
- Kanban Board
- Git with GitHub for source control
  - __[Git Flow Model]({{< ref "/post/gitflow.md" >}})__
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

{{< spacer >}}

{{< lazyimg src="/img/bbr/kanban.png" class="lazyimg" >}}
{{< spacer >}}
{{< line >}}
{{< spacer >}}
{{% centre %}}
## Features developed by me
{{< spacer >}}
### Texture Manager

A simple texture manager that was responsible for loading textures 
dynamically during runtime and through preloading at engine start 
up. The manager was responsible for storing texture IDs and providing them
when a texture was requested. __[STB_IMAGE](https://github.com/nothings/stb/blob/master/stb_image.h)__ was used to load textures from PNG and JPG filetypes.
{{< spacer >}}
{{< lazyimg src="/img/bbr/tm.png" class="lazyimg" >}}
{{< spacer >}}


### Physics Debug Renderer

This debug renderer shows the Bounding boxes of the physics objects
within the scene. A vector data structure was implemented so that
debug data could be inserted dynamically without first checking
the number of collision bodies in the scene.
{{< spacer >}}
{{< lazyimg src="/img/bbr/debug.png" >}}
{{< spacer >}}


### GUI

The GUI was implemented using the __[Nuklear](https://github.com/Immediate-Mode-UI/Nuklear)__ immediate mode GUI 
library. With minimal documentation, it was quite a challenge to implement, and multiple times I was required to read 
through hundreds of lines of source code to figure out why something wasn't behaving as expected.
{{< spacer >}}
{{< lazyimg src="/img/bbr/gui.png" class="lazyimg" >}}
{{< spacer >}}

### Skybox

The skybox was implemented by creating a 1x1 cube applying a texture to its internal
faces. This cube was then placed around the camera with its location translated with the camera every frame so that the player could always see it.
The final requirement was to render the cube first per frame and with the depth buffer disabled so that all other objects
drawn appear in front of it.
{{< spacer >}}
{{< lazyimg src="/img/bbr/skybox.png" class="lazyimg" >}}
{{< spacer >}}


### Game Logic (Partial)

The game logic was implemented using LUA and allowed us to use LUA's table structures to form class-like data structures.
I helped Peter implement game logic, such as level transitions and ball movement/control. I also created scripts 
for in-game menu interactions/HUD, scoring, and polish such as models in the game.
{{< spacer >}}
{{< lazyimg src="/img/bbr/logic.png" class="lazyimg" >}}
{{% /centre %}}