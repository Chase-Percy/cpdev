class node {
    constructor(G, H, F, blocked) {
        this.G = G;
        this.H = H;
        this.F = F;
        this.blocked = blocked;
    };
}

class graph {
    #nodeMap = new Array(3);
    #meshMap = new Array(3);
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
        this.size = size;

        this.#nodeMap = new Array(size);
        this.#meshMap = new Array(size);

        for (let i = 0; i < size; ++i) {
            this.#nodeMap[i] = new Array(size);
            this.#meshMap[i] = new Array(size);
            for (let j = 0; j < size; ++j) {
                this.#nodeMap[i][j] = new node(0, 0, 0, false);
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
    };

    toggleNodeBlock(x, y) {
        x = parseInt(x);
        y = parseInt(y);
        if (x < this.size && y < this.size && x >= 0 && y >= 0 && !(x === this.start[0] && y === this.start[1])
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
    };

    setNodeGFH(x, y, G, F, H) {
        this.#nodeMap[x][y].G = G;
        this.#nodeMap[x][y].F = F;
        this.#nodeMap[x][y].H = H;
    };

    #createMaterial(i, j, scene) {
        let mat = new BABYLON.StandardMaterial((i).toString() + (j).toString(), scene);
        mat.alpha = 1;
        return mat;
    };

    createMesh(scene) {
        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                this.#meshMap[i][j] = BABYLON.MeshBuilder.CreateBox((i).toString() + (j).toString(), {});
                this.#meshMap[i][j].position.x = i;
                this.#meshMap[i][j].position.z = j;

                if (this.#meshMap[i][j].material == null) {
                    this.#meshMap[i][j].material = this.#createMaterial(i, j, scene);
                }

                if (i === this.start[0] && j === this.start[1]) {
                    this.#meshMap[i][j].material.diffuseColor = this.#red;
                } else if (i === this.end[0] && j === this.end[1]) {
                    this.#meshMap[i][j].material.diffuseColor = this.#green;
                } else {
                    this.#meshMap[i][j].material.diffuseColor = this.#grey;
                }
            }
        }
    };

    createShadowMap(scene, shadowGen) {
        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                shadowGen.addShadowCaster(this.#meshMap[i][j], true);
                this.#meshMap[i][j].recieveShadows = true;
            }
        }
    };

    #calculateBestPath() {

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

    map.setNodeBlock(3, 3, true);
    map.setNodeBlock(3, 4, true);
    map.setNodeBlock(3, 5, true);
    map.setNodeBlock(4, 3, true);
    map.setNodeBlock(5, 3, true);
    map.setNodeBlock(6, 3, true);

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
