class node {
    parent;

    constructor(G, H, F, location, blocked) {
        this.G = G;
        this.H = H;
        this.F = F;
        this.location = location;
        this.blocked = blocked;
    };
}

export class graph {
    #nodeMap;
    #meshMap;
    #red = new BABYLON.Color3(0.8, 0, 0);
    #green = new BABYLON.Color3(0, 0.8, 0);
    #blue = new BABYLON.Color3(0, 0, 0.8);
    #grey = new BABYLON.Color3(0.8, 0.8, 0.8);
    #black = new BABYLON.Color3(0.1, 0.1, 0.1);
    #startActive = true;
    #endActive = true;

    constructor(size, start, end) {
        if (size < 3) {
            size = 3;
        }
        this.start = start;
        this.end = end;
        this.size = size + 2;

        this.start[0] += 1;
        this.start[1] += 1;
        this.end[0] += 1;
        this.end[1] += 1;

        this.#nodeMap = new Array(this.size);
        this.#meshMap = new Array(this.size);

        for (let i = 0; i < this.size; ++i) {
            this.#meshMap[i] = new Array(this.size);
        }

        for (let i = 0; i < this.size; ++i) {
            this.#nodeMap[i] = new Array(this.size);
            for (let j = 0; j < this.size; ++j) {
                if (i < this.size - 1 && i > 0 && j < this.size - 1 && j > 0) {
                    this.#nodeMap[i][j] = new node(0, 0, 0, [i, j], false);
                } else {
                    this.#nodeMap[i][j] = new node(0, 0, 0, [i, j], true);
                }
            }
        }
    };

    setNodeBlock(x, y, blocked) {
        this.#nodeMap[x][y].blocked = blocked;
        if (blocked) {
            this.#meshMap[x][y].material.diffuseColor = this.#black;
            this.#meshMap[x][y].position.y = 0.5;
        } else {
            this.#meshMap[x][y].material.diffuseColor = this.#grey;
            this.#meshMap[x][y].position.y = 0;
        }
        this.#calculateBestPath();
    };

    #isInBounds(x, y) {
        return (x < this.size - 1 && y < this.size - 1 && x >= 1 && y >= 1);
    }

    #isStartNode(x, y) {
        return (x === this.start[0] && y === this.start[1]);
    }

    #isEndNode(x, y) {
        return (x === this.end[0] && y === this.end[1]);
    }

    toggleNodeBlock(x, y) {
        x = Math.floor(x + 0.25);
        y = Math.floor(y + 0.25);
        if (this.#isInBounds(x, y) && !this.#isStartNode(x, y) && !this.#isEndNode(x, y)) {
            this.#nodeMap[x][y].blocked = !this.#nodeMap[x][y].blocked;
            if (this.#nodeMap[x][y].blocked) {
                this.#meshMap[x][y].material.diffuseColor = this.#black;
                this.#meshMap[x][y].position.y = 0.5;
            } else {
                this.#meshMap[x][y].material.diffuseColor = this.#grey;
                this.#meshMap[x][y].position.y = 0;
            }
        }
        this.#calculateBestPath();
    };

    toggleObjectiveBlocks(x, y) {
        x = Math.floor(x + 0.25);
        y = Math.floor(y + 0.25);
        if ((this.#isStartNode(x, y) && this.#endActive) || !this.#startActive) {
            if (this.#startActive) {
                this.#startActive = false;
                this.#resetMaterial();
            } else if (!this.#isEndNode(x, y) && this.#isInBounds(x, y) && !this.#nodeMap[x][y].blocked) {
                this.start = [x, y];
                this.#startActive = true;
                this.#calculateBestPath();
            }
        } else if ((this.#isEndNode(x, y) && this.#startActive) || !this.#endActive) {
            if (this.#endActive) {
                this.#endActive = false;
                this.#resetMaterial();
            } else if (!this.#isStartNode(x, y) && this.#isInBounds(x, y) && !this.#nodeMap[x][y].blocked) {
                this.end = [x, y];
                this.#endActive = true;
                this.#calculateBestPath();
            }
        }
    }

    #createMaterial(i, j, scene) {
        let mat = new BABYLON.StandardMaterial((i).toString() + (j).toString(), scene);
        mat.alpha = 1;
        return mat;
    };

    #resetMaterial() {
        for (let i = 1; i < this.size - 1; ++i) {
            for (let j = 1; j < this.size - 1; ++j) {
                if (i === this.start[0] && j === this.start[1] && this.#startActive) {
                    this.#meshMap[i][j].material.diffuseColor = this.#green;
                    this.#meshMap[i][j].position.y = 0.25;
                } else if (i === this.end[0] && j === this.end[1] && this.#endActive) {
                    this.#meshMap[i][j].material.diffuseColor = this.#red;
                    this.#meshMap[i][j].position.y = 0.25;
                } else if (this.#nodeMap[i][j].blocked) {
                    this.#meshMap[i][j].material.diffuseColor = this.#black;
                } else {
                    this.#meshMap[i][j].material.diffuseColor = this.#grey;
                    this.#meshMap[i][j].position.y = 0;
                }
            }
        }
    }

    #resetNodeCosts() {
        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                let node = this.#nodeMap[i][j];
                node.F = 0;
                node.G = 0;
                node.H = 0;
                node.parent = null;
            }
        }
    }

    createMesh(scene) {
        for (let i = 1; i < this.size - 1; ++i) {
            for (let j = 1; j < this.size - 1; ++j) {
                this.#meshMap[i][j] = BABYLON.MeshBuilder.CreateBox((i).toString() + (j).toString(), {});
                this.#meshMap[i][j].position.x = i;
                this.#meshMap[i][j].position.z = j;

                if (this.#meshMap[i][j].material == null) {
                    this.#meshMap[i][j].material = this.#createMaterial(i, j, scene);
                }
            }
        }
        this.#resetMaterial();
    };

    createShadowMap(scene, shadowGen) {
        for (let i = 1; i < this.size - 1; ++i) {
            for (let j = 1; j < this.size - 1; ++j) {
                shadowGen.addShadowCaster(this.#meshMap[i][j], false);
                this.#meshMap[i][j].recieveShadows = true;
            }
        }
    };

    #updateCosts(current, neighbour, cost) {
        let g = current.G + cost;
        let dx = Math.abs(neighbour.location[0] - this.end[0]);
        let dy = Math.abs(neighbour.location[1] - this.end[1]);
        let D = 1;
        let h = D * (dx + dy) + (2 * D - 2 * D) * Math.min(dx, dy);
        let f = g + h;
        if (f < neighbour.F || neighbour.F === 0) {
            neighbour.G = g;
            neighbour.F = f;
            neighbour.H = h;
            neighbour.parent = current;
        }
    }

    #getLowestFCost(open) {
        let lowest = open[0];

        for (let i = 0; i < open.length; ++i) {
            if (open[i].F < lowest.F) {
                lowest = open[i];
            }
        }
        return lowest;
    }

    #checkNeighbour(current, neighbour, open, closed, cost) {
        if (closed.indexOf(neighbour) === -1 && !neighbour.blocked) {
            this.#updateCosts(current, neighbour, cost);
            if (open.indexOf(neighbour) === -1) {
                open.push(neighbour);
            }
        }
    }

    #calculateBestPath() {
        if (!this.#startActive || !this.#endActive) {
            return;
        }
        this.#resetMaterial();
        this.#resetNodeCosts();
        let open = new Array(0);
        let closed = new Array(0);
        const adjacentCost = 10;
        const diagonalCost = 14;

        open.push(this.#nodeMap[this.start[0]][this.start[1]]);
        let current = this.#nodeMap[this.start[0]][this.start[1]];
        let first = true;

        while (open.length !== 0) {
            if (first) {
                first = false;
            } else {
                current = this.#getLowestFCost(open);
            }
            closed.push(current);

            let index = open.indexOf(current);
            open.splice(index, 1);

            if (current.location[0] === this.end[0] && current.location[1] === this.end[1]) {
                console.log("end found");
                break;
            }

            // Adjacent
            let neighbourML = this.#nodeMap[current.location[0]][current.location[1] - 1];
            let neighbourMR = this.#nodeMap[current.location[0]][current.location[1] + 1];
            let neighbourMD = this.#nodeMap[current.location[0] - 1][current.location[1]];
            let neighbourMU = this.#nodeMap[current.location[0] + 1][current.location[1]];

            this.#checkNeighbour(current, neighbourML, open, closed, adjacentCost);
            this.#checkNeighbour(current, neighbourMR, open, closed, adjacentCost);
            this.#checkNeighbour(current, neighbourMD, open, closed, adjacentCost);
            this.#checkNeighbour(current, neighbourMU, open, closed, adjacentCost);


            // Diagonal
            let neighbourBL = this.#nodeMap[current.location[0] - 1][current.location[1] - 1];
            let neighbourBR = this.#nodeMap[current.location[0] - 1][current.location[1] + 1];
            let neighbourTR = this.#nodeMap[current.location[0] + 1][current.location[1] - 1];
            let neighbourTL = this.#nodeMap[current.location[0] + 1][current.location[1] + 1];

            this.#checkNeighbour(current, neighbourBL, open, closed, diagonalCost);
            this.#checkNeighbour(current, neighbourBR, open, closed, diagonalCost);
            this.#checkNeighbour(current, neighbourTR, open, closed, diagonalCost);
            this.#checkNeighbour(current, neighbourTL, open, closed, diagonalCost);
        }

        current = current.parent;
        while (current !== this.#nodeMap[this.start[0]][this.start[1]]) {
            let mesh = this.#meshMap[current.location[0]][current.location[1]];
            mesh.material.diffuseColor = this.#blue;
            mesh.position.y = 0.1;
            current = current.parent;
        }
    };
}
