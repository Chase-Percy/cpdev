---
title: "Map Generation"
author: "Chase Percy"
type: ""
date: 2022-01-24T16:43:11+08:00
subtitle: "Creation From An Idea"
image: ""
tags: []
bigimg: [{src: "/img/ta/banner.webp"}]
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
With limited time and a goal that I wasn't sure was possible, I began the process of planning how to go about creating random map
generation. I decided that starting with the random generation of a 
single room would be ideal. The reason I started smaller, was to treat it as proof of concept and to
judge if it was possible within the time constraints.

I considered many options such as cellular automata but decided that a grid based approach would be quick and easy, as the assets we were using for dungeon creation were modular by design. 
Another advantage with a grid based system was how easily it would be to generate the required data for the AI. Since the
game only required information about the X and Z axis, the map data was easy to store in 2D arrays. Passing the data in 2D arrays
to be processed by the AI gave us a simplified data structure that required no forward declarations for either component.

Room generation was to be handled by a room object that creates itself given a set of parameters.   
These included:
- Width/Length.
- Percentage of the floor to randomly fill with obstacles.
- Percentage of the walls to randomly decorate.
- An array of model smart pointers to be used for the models that make up the room (walls, props, etc.).
- The origin of the room (x, z).
- The door coordinates.
- A seed.

{{< whiteLine >}}
{{< details title="Room Constructor" dClass="dark" sClass="dark" >}}
{{< highlight cpp >}}
/**
 * Generates a room given a x,z, an origin (bottom left), and a set of
 * models
 * @param x the size of the room on the x axis
 * @param z the size of the room on the z axis
 * @param wallFillPercent The percent of the walls to fill with decorations
 * @param floors the floors for the room, the first element is the default
 * floor
 * @param floorFillPercent The percent of the floor to fill with decoration.
 * @param xOrigin the x origin of the room
 * @param zOrigin the z origin of the room
 * @param roomModels the models for the room
 * @param seed the seed for room generation
 * 
*/
gameRoom::gameRoom(int x,
                   int z,
                   int wallFillPercent,
                   int floorFillPercent,
                   int xOrigin,
                   int zOrigin,
                   const RoomModels& roomModels,
                   int seed,
                   const std::vector<std::pair<int, int>>& doors)
    : m_models(roomModels),
      m_seed(seed),
      m_doors(doors) {
    // Save x and z size
    if (x < 1) {
        x = 1;
    }
    if (z < 1) {
        z = 1;
    }

    // Save floor dimensions
    m_floor.xMax = x;
    m_floor.zMax = z;
    m_floor.max = z * x;

    // Save floor size plus walls
    const int corners{2};
    m_wall.xMax = x + corners;
    m_wall.zMax = z + corners;
    m_wall.max = x * 2 + z * 2;

    // Set room dimensions
    m_dimensions.xMax = x + corners;
    m_dimensions.zMax = z + corners;
    m_dimensions.max = m_dimensions.xMax * m_dimensions.zMax;

    // Set room map size
    m_accessible = new accessTypes[m_dimensions.max];
    // Set it empty
    memset(m_accessible,
           accessTypes::empty,
           sizeof(accessTypes) * m_dimensions.max);

    // Save origin offsets
    m_offset.xCent = xOrigin + m_dimensions.xMax / 2;
    m_offset.zCent = zOrigin + m_dimensions.zMax / 2;
    m_offset.xMax = xOrigin + m_dimensions.xMax;
    m_offset.zMax = zOrigin + m_dimensions.zMax;
    m_offset.xMin = xOrigin;
    m_offset.zMin = zOrigin;

    // Create itself
    createRoom();
    addDecoration((float)floorFillPercent, (float)wallFillPercent);
    generateWallPoints();
    generateEntityBoundingSpheres();
}
{{< /highlight >}}
{{</details>}}
{{< whiteLine >}}

After room generation had been successfully implemented more planning was done to figure out how to create levels from these
randomly generated rooms.

There were two major issues to consider when planning the level creation:
- Every room in the level must be connected and accessible within the level.
- Within each room there was a walkable path between all doors.

The first issue was resolved by placing the rooms within a 50 by 50 grid in a random order. The first room was guaranteed
to be at the center of the grid and always of the same size. This was treated as the spawn room for that level and contained no
obstacles that had collision, only a trapdoor that opened once enough enemies were defeated.

{{< whiteLine >}}
{{< lazyimg src="/img/ta/portal.png" >}}
{{< whiteLine >}}

After placing the spawn room, new rooms were then randomly placed relative to the last room that was successfully placed.
The rooms were placed relative to the last successfully placed room to create a better flow to the map and ensure it wasn't too
congested.

Rooms were placed by multiplying the current rooms' origin with a random vector. Once placed three checks were performed:
- Check the room is completely within the 50 x 50 grid.
- Ensure the room isn't overlapping with any other room.
- Ensure that the room was in-line with at least one other room.

The reason for the final check was to ensure that all rooms were connected and that a corridor could be placed 
perpendicularly between the two rooms. Although this solution wasn't ideal, it was a quick solution that provided acceptable results.

Once all the rooms (about 8) have been placed the doors and corridors were randomly placed where two rooms were parallel.
These doors were only placed on a rooms positive X/Z axis' to ensure that there was only one connection between two rooms.

After the doors were placed a simple algorithm was used to walk from each door to the opposite wall.  
The algorithm worked as follows:
- For each door (or wall if no door) in the room:
  - Attempt to walk from the door/wall to the opposite wall.
    - If the location in front is not blocked; move forward.
    - Else if the locations to the left aren't blocked; move forward on the first open space.
    - Else if the locations to the right aren't blocked; move forward on the first open space.
    - Else delete the obstacle directly in front and move forward.

{{< whiteLine >}}
{{< details title="Algorithm Implementation" dClass="dark" sClass="dark" >}}
{{< highlight cpp >}}

void gameRoom::walkRoom(std::pair<int, int> start, direction doorAxis) {
    if (doorAxis == NaD) {
        return;
    }

    // Door or wall centre
    int row = start.first;
    int col = start.second;

    // Walking positions
    int walkingStart{0};
    int walkingEnd{0};
    setWalkingStart(walkingStart, walkingEnd, doorAxis);

    // Strafe (side) checking
    int strafe{0};
    int strafeEnd{0};

    while (walkingStart != walkingEnd) {
        // Replace Entity if blocking
        if (isFloorEntity(row, col)) {
            removeFloorEntity(row, col);
            createFloorType(row, col, m_models.floors[0], accessTypes::floor);
        }

        // Check next step
        bool walk{false};
        bool swapped{false};
        setStrafe(strafe, strafeEnd, doorAxis, row, col);
        int startingStrafe = strafe;
        int startingRow = row, startingCol = col;

        while (strafe != strafeEnd) {
            std::pair<bool, bool> result = checkStrafeCollision(strafe,
                                                                doorAxis,
                                                                row,
                                                                col);

            // Current position is valid
            if (result.first && result.second) {
                walk = true;
                break;
            }

            // Check other direction
            if ((!result.first && !result.second) || strafe == strafeEnd) {
                if (swapped) {
                    break;
                }
                strafeEnd = 0;
                strafe = startingStrafe;
                swapped = true;
            }

            // Update strafe movement
            strafe = (strafe < strafeEnd) ? ++strafe : --strafe;
        }

        // If both directions failed, walk forward
        if (!walk) {
            row = startingRow;
            col = startingCol;
            walkForward(row, col, doorAxis);
        }

        // Increment / Decrement walking start
        updateWalking(walkingStart, doorAxis);
    }
}
{{< /highlight >}}
{{</details>}}
{{< whiteLine >}}

Once this has been completed for all doors/walls in the room, then it is guaranteed that there will be a path through the room as the
paths walked through the room create a cross.

Finally, the corridors were placed between doors to complete the level. Corridors were just rooms that were one tile wide
and long enough to connect two doors. Corridors have no obstacles in them, and they also have no model for where the door should be,
as it would overlap with the one provided by the room.

### Development
The process of creating random room generation happened fast with the initial plan and design came together cleanly. During the development 
of this I had my group members review the code and suggest improvements to both design and performance. The development took around a week 
and a half and was a fun and rewarding process.

__[Source Code](https://gitfront.io/r/cp-dev/10d5e1649dea095933feec282ec8865c5173d144/ICT290/tree/src/scene/theArchanist/map/)__

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
In the end the map generation worked great, and I was pleased with the solution I created within the timeframe and knowledge I had.

{{< whiteLine >}}
{{< youtube iFozMHvnna0 >}}