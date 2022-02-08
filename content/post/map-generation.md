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
- Design a random map generation algorithm to provide re-playability for the player.
- The algorithm had to be fast enough to not hinder gameplay with excessive load times.
- It had to work with the AI component that was still under development.
  - Wall locations and dimensions.
  - Entities/Obstacles within each room.
  - Door locations and information about connected corridors.
  - A guarantee that all rooms were accessible and that the AI and player could navigate between doors without being obstructed.
- It had to be completed within a limited timeframe (2 weeks) alongside other game developments.
- Allow different art assets to be swapped out easily.
- Seeded so maps can be replayed.
<!--more-->

{{< line >}}

## The Process

### Planning
With limited time and a goal that I wasn't sure was possible, I decided that starting with the random generation of a 
single room would be ideal. The reason I started smaller, was to treat it as proof of concept and to
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
- An array of model smart pointers to be used for the models that make up the room (walls, props, etc.).
- The origin of the room (x, z).
- The door coordinates.
- A seed.

### Development
The process of creating random room generation happened fast. The initial plan that and design came together cleanl During the development of this I had my group members review
the code and suggest improvements to both design and performance.

### Further Planning

### Development Continued

### Testing
Simple tests were written within the Google test framework. These tests ensured that room generation was creating the rooms
correctly regarding the parameters passed in, such as ensuring correct dimensions.

Stress testing was also performed by generating and rendering new maps every second for several minutes.
This test allowed a benchmark performance as more features were added and also lead to the discovery of a rare
edge case crash that I was able to fix.

{{< whiteLine >}}

{{< details title="Testing Snippet" dClass="dark" sClass="dark" >}}
{{< highlight cpp >}}
void testRoom(int x,
          int z,
          int xOrigin,
          int zOrigin,
          std::shared_ptr<gameRoom>& test) {
          
    auto wallPoints{test->getWallPoints()};
    auto boundingSpheres{test->getBoundingSpheres()};

    // There must be 4 wall points
    ASSERT_TRUE(wallPoints.size() == 4);
    // Check each sub vector has it's first point, second point, and normal
    for (auto& wall : wallPoints) {
        ASSERT_TRUE(wall.size() == 3);
    }

    // Check all 8 points (ROOMS WITH NO DOORS ONLY)
    // Wall 1
    // P1
    ASSERT_TRUE(wallPoints[0][0].x == xOrigin + GR_OBJ_SCALE);
    ASSERT_TRUE(wallPoints[0][0].z == zOrigin + GR_OBJ_SCALE);
    // P2
    ASSERT_TRUE(wallPoints[0][1].x == x + xOrigin + GR_OBJ_SCALE);
    ASSERT_TRUE(wallPoints[0][1].z == zOrigin + GR_OBJ_SCALE);
    // Normal
    ASSERT_TRUE(wallPoints[0][2].x == 0);
    ASSERT_TRUE(wallPoints[0][2].z == 1);

    // Wall 2
    // P1
    ASSERT_TRUE(wallPoints[1][0].x == xOrigin + GR_OBJ_SCALE);
    ASSERT_TRUE(wallPoints[1][0].z == z + zOrigin + GR_OBJ_SCALE);
    // P2
    ASSERT_TRUE(wallPoints[1][1].x == x + xOrigin + GR_OBJ_SCALE);
    ASSERT_TRUE(wallPoints[1][1].z == z + zOrigin + GR_OBJ_SCALE);
    // Normal
    ASSERT_TRUE(wallPoints[1][2].x == 0);
    ASSERT_TRUE(wallPoints[1][2].z == -1);

    // Wall 3
    // P1
    ASSERT_TRUE(wallPoints[2][0].x == xOrigin + GR_OBJ_SCALE);
    ASSERT_TRUE(wallPoints[2][0].z == zOrigin + GR_OBJ_SCALE);
    // P2
    ASSERT_TRUE(wallPoints[2][1].x == xOrigin + GR_OBJ_SCALE);
    ASSERT_TRUE(wallPoints[2][1].z == z + zOrigin + GR_OBJ_SCALE);
    // Normal
    ASSERT_TRUE(wallPoints[2][2].x == 1);
    ASSERT_TRUE(wallPoints[2][2].z == 0);

    // Wall 4
    // P1
    ASSERT_TRUE(wallPoints[3][0].x == x + xOrigin + GR_OBJ_SCALE);
    ASSERT_TRUE(wallPoints[3][0].z == zOrigin + GR_OBJ_SCALE);
    // P2
    ASSERT_TRUE(wallPoints[3][1].x == x + xOrigin + GR_OBJ_SCALE);
    ASSERT_TRUE(wallPoints[3][1].z == z + zOrigin + GR_OBJ_SCALE);
    // Normal
    ASSERT_TRUE(wallPoints[3][2].x == -1);
    ASSERT_TRUE(wallPoints[3][2].z == 0);

    // No decorations added
    ASSERT_TRUE(boundingSpheres.empty());   
}
    
TEST(RoomGenerationTest, TestWallPoints_xGreater) {
    int x{3}, z{77}, xOrigin{-45}, zOrigin{99};
    auto room = makeRoom(x, z, xOrigin, zOrigin);
    testRoom(x, z, xOrigin, zOrigin, room);
}

TEST(RoomGenerationTest, TestWallPoints_zGreater) {
    int x{50}, z{4}, xOrigin{55}, zOrigin{0};
    auto room = makeRoom(x, z, xOrigin, zOrigin);
    testRoom(x, z, xOrigin, zOrigin, room);
}

TEST(RoomGenerationTest, TestWallPoints_zOne) {
    int x{5}, z{1}, xOrigin{25}, zOrigin{66};
    auto room = makeRoom(x, z, xOrigin, zOrigin);
    testRoom(x, z, xOrigin, zOrigin, room);
}

{{< /highlight >}}
{{</details>}}

{{< line >}}

## The Result
