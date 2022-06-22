---
title: "Ant Game"
author: "Chase Percy"
type: "page"
date: 2022-06-21T13:10:33+08:00
subtitle: "Chase Percy"
image: ""
tags: []
bigimg: [{src: "/img/ant/banner.png"}]
---

{{< lazyimg src="/img/ant/icons.png" class="lazyimg" title="C++ | LUA | CMAKE | GITHUB" >}}

{{< spacer >}}

{{< centreText h="2" >}}
 An Educational Adventure
 {{< spacer >}}
{{< /centreText >}}
{{< youtube oCxbHj_EfVQ >}}
{{< line >}}
{{< spacer >}}

{{< centreText h="2" >}}
Development Team
{{< /centreText >}}

{{% centre %}}  
Matthew Davis  
Rhys Mader  
Aaron Koenig  
Chase Percy  

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
- Doxygen
- CI/CD
    - Static Analyzer (CPPCheck)
    - Automated unit tests
    - GitHub Actions

{{< endcolumns >}}

{{< spacer >}}

{{< lazyimg src="/img/ant/board.png" class="lazyimg" >}}
{{< spacer >}}
{{< line >}}
{{< spacer >}}
{{% centre %}}

## Features developed by me

{{< spacer >}}

### Terrain

I implemented the terrain using the [strategy pattern](https://refactoring.guru/design-patterns/strategy) 
so that I could switch out the vertex generation
method (Triangles, Quads, Patches) and the heightmap generation methods (Noise, Fault, File) without altering any code in the terrain class or in the
game states. For this project I used patches for the vertex generation, and I loaded the heightmap from
a 16-bit raw file. The terrain was textured in the fragment shader and textures were applied based on
the height of the fragment. Steepness based texturing was also used to apply rock to steep faces and mix
flowers into the grass on flat grass surfaces.

{{< spacer >}}

{{< lazyimg src="/img/ant/terrain.png" class="lazyimg" >}}

{{< spacer >}}

### Terrain Tessellation

I implemented our terrain tessellation shaders to improve performance when drawing the terrain over
long distances. The amount of vertices per patch is determined by the patches distance from the camera.
Normals are dynamically calculated during the evaluation stage and are created by sampling and averaging
the surrounding pixels on the heightmap.

{{< spacer >}}

{{< youtube k15gzgD8LAE >}}

{{< spacer >}}

### GUI

The GUI was designed around a canvas and element system that allowed the designer to create elements
and place them on a canvas via a Lua script. It is abstracted from any library but the library used 
for this project was ImGui. A factory takes the lua tables and creates an abstract element object
and applies them to a canvas. These elements are drawn when the canvas is drawn and their processing,
such as clicking on a button is only handled when they are active. 

{{< spacer >}}

{{< lazyimg src="/img/ant/GUI.png" class="lazyimg" >}}

{{< spacer >}}

### Math Library Abstraction

The math classes were designed using templates and providing functions to be implemented by a math
library. This decoupled the library from our engine and allowed us to switch out a library or function
without touching any code outside the facade. The library we used for this project was GLM as it was
specifically designed for OpenGL. Below is an image of the facade in use. 

{{< spacer >}}

{{< lazyimg src="/img/ant/math.png" class="lazyimg" >}}

{{< spacer >}}

### Water Shader

The water shader was implemented using a separate fragment shader to the models. The movement effect was
created by sampling a DuDv map (An inverted normal map to store directional data) and offsetting it by
a movement value multiplied by the delta time since the last frame. The reflection was created by sampling
the skybox relative to the camera and the distortion from the DuDv was applied to give it the rippling
movement effect. This was then mixed with a blue colour to give it its final colour for the fragment.

{{< spacer >}}

{{< youtube d3MyTP2Ix8c >}}

{{< spacer >}}

### Lighting

[Phong lighting](https://en.wikipedia.org/wiki/Phong_reflection_model) 
was applied to the models and terrain to create a more immersive environment. Terrain
lighting was calculated dynamically based off the normals that were generated in the tesselation evaluation
shader and this allowed the terrain to be lit smoothly and cheaply as the amount of vertices was limited
by the tesselation control shader. The phong lighting for the models was initially implemented by Matt, 
but I refactored it to use the bi-tangent and tangent of the vertices so that the lighting would update
relative to a models' orientation when it moved. I also implemented normal mapping to give the models much
more depth and better lighting through the of sampling a normal map texture. 


{{< spacer >}}

#### Per Vertex
{{< lazyimg src="/img/ant/noNormal.png" class="lazyimg" >}}

{{< spacer >}}

#### Normal Mapping
{{< lazyimg src="/img/ant/normal.png" class="lazyimg" >}}

{{< spacer >}}

### Game Logic

The game logic for the game loop was implemented on a game state object and included basic rendering
updating (camera, physics, etc.), and input handling. It was responsible for loading the initial game
objects from lua and storing them for use at run time. The game state contained an entity manager that
was responsible for tracking all the game objects in the game state, as well as providing access to them
and calculating which objects should be rendered and at what LOD level. The majority of the logic was
implemented through the entity component system [ECS](https://en.wikipedia.org/wiki/Entity_component_system)
attached to the game objects and mainly the player object.

{{< spacer >}}

{{< youtube XzK7FQ0_pwU >}}

{{< spacer >}}
