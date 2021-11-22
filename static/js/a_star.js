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

class graph {
    #nodeMap;
    #meshMap;
    #red = new BABYLON.Color3(0.8, 0, 0);
    #green = new BABYLON.Color3(0, 0.8, 0);
    #blue = new BABYLON.Color3(0, 0, 0.8);
    #grey = new BABYLON.Color3(0.8, 0.8, 0.8);
    #black = new BABYLON.Color3(0.1, 0.1, 0.1);

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

    toggleNodeBlock(x, y) {
        x = Math.floor(x + 0.25);
        y = Math.floor(y + 0.25);
        if (x < this.size - 1 && y < this.size - 1 && x >= 1 && y >= 1 && !(x === this.start[0] && y === this.start[1])
            && !(x === this.end[0] && y === this.end[1])) {
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

    #createMaterial(i, j, scene) {
        let mat = new BABYLON.StandardMaterial((i).toString() + (j).toString(), scene);
        mat.alpha = 1;
        return mat;
    };

    #resetMaterial() {
        for (let i = 1; i < this.size - 1; ++i) {
            for (let j = 1; j < this.size - 1; ++j) {
                if (i === this.start[0] && j === this.start[1]) {
                    this.#meshMap[i][j].material.diffuseColor = this.#green;
                } else if (i === this.end[0] && j === this.end[1]) {
                    this.#meshMap[i][j].material.diffuseColor = this.#red;
                } else if (this.#nodeMap[i][j].blocked) {
                    this.#meshMap[i][j].material.diffuseColor = this.#black;
                } else {
                    this.#meshMap[i][j].material.diffuseColor = this.#grey;
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
                shadowGen.addShadowCaster(this.#meshMap[i][j], true);
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

    #calculateBestPath() {
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
            if (closed.indexOf(neighbourML) === -1 && !neighbourML.blocked) {
                this.#updateCosts(current, neighbourML, adjacentCost);
                if (open.indexOf(neighbourML) === -1) {
                    open.push(neighbourML);
                }
            }

            let neighbourMR = this.#nodeMap[current.location[0]][current.location[1] + 1];
            if (closed.indexOf(neighbourMR) === -1 && !neighbourMR.blocked) {
                this.#updateCosts(current, neighbourMR, adjacentCost);
                if (open.indexOf(neighbourMR) === -1) {
                    open.push(neighbourMR);
                }
            }

            let neighbourMD = this.#nodeMap[current.location[0] - 1][current.location[1]];
            if (closed.indexOf(neighbourMD) === -1 && !neighbourMD.blocked) {
                this.#updateCosts(current, neighbourMD, adjacentCost);
                if (open.indexOf(neighbourMD) === -1) {
                    open.push(neighbourMD);
                }
            }

            let neighbourMU = this.#nodeMap[current.location[0] + 1][current.location[1]];
            if (closed.indexOf(neighbourMU) === -1 && !neighbourMU.blocked) {
                this.#updateCosts(current, neighbourMU, adjacentCost);
                if (open.indexOf(neighbourMU) === -1) {
                    open.push(neighbourMU);
                }
            }

            // Diag
            let neighbourBL = this.#nodeMap[current.location[0] - 1][current.location[1] - 1];
            if (closed.indexOf(neighbourBL) === -1 && !neighbourBL.blocked) {
                this.#updateCosts(current, neighbourBL, neighbourBL);
                if (open.indexOf(neighbourBL) === -1) {
                    open.push(neighbourBL);
                }
            }

            let neighbourBR = this.#nodeMap[current.location[0] - 1][current.location[1] + 1];
            if (closed.indexOf(neighbourBR) === -1 && !neighbourBR.blocked) {
                this.#updateCosts(current, neighbourBR, diagonalCost);
                if (open.indexOf(neighbourBR) === -1) {
                    open.push(neighbourBR);
                }
            }

            let neighbourTR = this.#nodeMap[current.location[0] + 1][current.location[1] - 1];
            if (closed.indexOf(neighbourTR) === -1 && !neighbourTR.blocked) {
                this.#updateCosts(current, neighbourTR, diagonalCost);
                if (open.indexOf(neighbourTR) === -1) {
                    open.push(neighbourTR);
                }
            }

            let neighbourTL = this.#nodeMap[current.location[0] + 1][current.location[1] + 1];
            if (closed.indexOf(neighbourTL) === -1 && !neighbourTL.blocked) {
                this.#updateCosts(current, neighbourTL, diagonalCost);
                if (open.indexOf(neighbourTL) === -1) {
                    open.push(neighbourTL);
                }
            }
        }

        current = current.parent;
        while (current !== this.#nodeMap[this.start[0]][this.start[1]]) {
            this.#meshMap[current.location[0]][current.location[1]].material.diffuseColor = this.#blue;
            current = current.parent;
        }
    };
}

const canvas = window.document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    let mapSize = 10;
    let map = new graph(mapSize, [1, 1], [9, 4]);

    map.createMesh();

    //map.setNodeBlock(3, 3, true);
    //map.setNodeBlock(3, 4, true);
    //map.setNodeBlock(3, 5, true);
    //map.setNodeBlock(4, 3, true);
    //map.setNodeBlock(5, 3, true);
    //map.setNodeBlock(6, 3, true);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const ambient = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(mapSize / 2, 3, mapSize / 2));
    const dirLight = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(0, 0, -1), scene);
    dirLight.position = new BABYLON.Vector3(0, 2, 1);

    let shadowGen = new BABYLON.ShadowGenerator(1024, dirLight);
    map.createShadowMap(scene, shadowGen);

    scene.onPointerDown = function (event, result) {
        if (event.button === 2) {
            map.toggleNodeBlock(result.pickedPoint.x, result.pickedPoint.z);
        }
    }

    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
