---
title: "The Arcanist"
author: "Chase Percy"
type: "page"
date: 2021-11-13T16:47:55+08:00
subtitle: "ICT290 Project"
image: ""
tags: []
bigimg: [{src: "/img/ta/banner.webp"}]
---
{{< lazyimg src="/img/ta/icons.png" class="lazyimg" title="C++ | CMAKE | GITHUB" class="lazyimg" >}}

{{< spacer >}}
{{% centre %}}
## A diablo inspired dungeon crawler
{{< spacer >}}
{{< youtube WlOtn7QeDh0 >}}
{{< spacer >}}
{{< line >}}
{{< spacer >}}
## Development Team
Matthew Davis  
Michael John  
Chase Percy  
{{< spacer >}}
## Source Code
__[The Arcanist Repo](https://gitfront.io/r/cp-dev/10d5e1649dea095933feec282ec8865c5173d144/ICT290/)__  
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
- Peer code review

{{< column >}}
- CI/CD
  - GitHub Actions
  - Static Analyzer (CPPCheck)
  - Automated unit tests (Gtest)
  - Clang-format
- Doxygen

{{< endcolumns >}}


{{< gallery dir="/img/ta/project/" />}}
{{< spacer >}}
{{< line >}}
{{< spacer >}}
{{% centre %}}
## Features developed by me

{{< spacer >}}

### Game Engine
- __[OFF](https://en.wikipedia.org/wiki/OFF_(file_format))__, __[OBJ](https://en.wikipedia.org/wiki/Wavefront_.obj_file)__, and __[MTL](https://en.wikipedia.org/wiki/Wavefront_.obj_file#Material_template_library)__ Loader
- __[VBO](https://en.wikipedia.org/wiki/Vertex_buffer_object)__ Support
- Support for multiple game scenes (Menu, Shays-world, The Arcanist)
- Skybox
- Audio (__[irrKlang](https://www.ambiera.com/irrklang/)__)
- Persistent settings
- GUI (__[ImGui](https://github.com/ocornut/imgui)__)

The engine was primarily developed through the first 4 weeks of the project and was the foundation for
black-boxing Shays-world and creating our game, The Arcanist. Vertex Buffer Support (__[VBO](https://en.wikipedia.org/wiki/Vertex_buffer_object)__)
was what allowed us to achieve greater visual fidelity while maintaining good performance using legacy __[OpenGL](https://www.khronos.org/opengl/wiki/History_of_OpenGL)__.
{{< spacer >}}
### GUI
Designed by me using the __[ImGui](https://github.com/ocornut/imgui)__ Library. 
{{< spacer >}}
{{< gallery dir="/img/ta/gui/" />}}
{{< spacer >}}

### Arcanist Game Implementation
This included the game logic for the arcanist (excluding AI). Object events such as model updates, basic enemy
animations, input handling, level transitions, shadows, collision particles, etc...
{{< spacer >}}
{{< lazyimg src="/img/ta/implementation.png" class="lazyimg" >}}
{{< spacer >}}

### Collision Detection
Basic collision detection was used with data provided from map generation. This ensured the AI stayed within
the bounds of the map or walk through obstacles, and that projectiles would explode on impacting something. 
{{< spacer >}}
{{< youtube EzsScwbQ-j0  >}}
{{< spacer >}}

### Seeded Map Generation
A room generation and Map generation algorithm I made was used to generate a map with a set amount of rooms randomly
and a place range of possible obstacles within.

__[Further Reading]({{< ref "/post/map-generation.md" >}})__
{{< spacer >}}

{{< lazyimg src="/img/ta/map.png" class="lazyimg" >}}
{{< spacer >}}

### Connection Between Game State & AI  
The AI and game state were associated through game objects which were updated to match the location
and rotation of AI entities. Appropriate associated models were mapped to these objects and were kept
independent of the AI entities themselves. If an AI entity was killed, the object would
still exist but now represent a dead enemy at the AI entity's last location. I also helped adjust the AI to navigate better around the rooms and refined features such as collisions and tweaking movement values.
{{< spacer >}}
{{< lazyimg src="/img/ta/integration.png" class="lazyimg" >}}
{{% /centre %}}
