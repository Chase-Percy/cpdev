---
title: "The Arcanist"
author: "Chase Percy"
type: "page"
date: 2021-11-13T16:47:55+08:00
subtitle: "ICT290 Project"
image: ""
tags: []
---

{{< lazyimg src="/img/ta/icons.png" class="lazyimg" title="CPP | CMAKE | GITHUB" class="lazyimg" >}}

{{< whiteLine >}}

## A diablo inspired dungeon crawler

{{< youtube WlOtn7QeDh0 >}}

{{< line >}}

## Development Team
- Matthew Davis
- Michael John
- Chase Percy

## Repo
- [The Arcanist](https://gitfront.io/r/cp-dev/10d5e1649dea095933feec282ec8865c5173d144/ICT290/)  
(Hosted through GitFront instead of a public GitHub repo to help prevent plagiarism)

## Project Planning and Tools
{{< columns >}}
- Weekly meetings
- Kanban Board
- Git with GitHub for source control
  - Git flow model
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

{{< line >}}

## Features developed by me

### Game Engine
- [OFF](https://en.wikipedia.org/wiki/OFF_(file_format)), [OBJ](https://en.wikipedia.org/wiki/Wavefront_.obj_file), and [MTL](https://en.wikipedia.org/wiki/Wavefront_.obj_file#Material_template_library) Loader
- [VBO](https://en.wikipedia.org/wiki/Vertex_buffer_object) Support
- Support for multiple scenes (Menu, Shays-world, The Arcanist)
- Skybox
- Audio ([irrKlang](https://www.ambiera.com/irrklang/))
- Persistent settings
- GUI ([ImGui](https://github.com/ocornut/imgui))

The engine was primarily developed through the first 4 weeks of the project and was the foundation for
black-boxing Shays-world and creating our game, The Arcanist. Vertex Buffer Support ([VBO](https://en.wikipedia.org/wiki/Vertex_buffer_object))
was what allowed us to achieve greater visual fidelity while maintaining good performance using legacy [OpenGL](https://www.khronos.org/opengl/wiki/History_of_OpenGL).

### GUI
Designed by me using the [ImGui](https://github.com/ocornut/imgui) Library. 

{{< gallery dir="/img/ta/gui/" />}}

### Arcanist Game Implementation
This included the game logic for the arcanist (excluding AI). Object events such as model updates, basic enemy
animations, input handling, level transitions, shadows, collision particles, etc...

{{< lazyimg src="/img/ta/implementation.png" class="lazyimg" >}}

### Collision Detection
Basic collision detection was used with data provided from map generation. This was used to ensure AI stayed within
the bounds of the map or walk through obstacles and that projectiles would explode on impacting something. 

{{< youtube EzsScwbQ-j0  >}}

### Seeded Map Generation
A room generation and Map generation algorithm I made was used to randomly generate a map with a set amount of rooms
and a range of possible obstacle densities.

{{< lazyimg src="/img/ta/map.png" class="lazyimg" >}}

### Connection Between Game State & AI  
The AI and game state were associated through game objects which were updated to match the location
and rotation of AI entities. Appropriate associated models were mapped to these objects and were kept
independent of the AI entities themselves. This was so if an AI entity was killed the object would
still exist, but now represent a dead enemy at the AI entities last location. I also helped adjust the AI to better
navigate the rooms and refined certain features such as collisions and tweaking movement values.

{{< lazyimg src="/img/ta/integration.png" class="lazyimg" >}}
