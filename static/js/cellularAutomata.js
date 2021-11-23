const canvas = window.document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

class CA_Graph {
    #isRunning = false;
    #meshMap;
    #cellMap;
    #red = new BABYLON.Color3(0.8, 0, 0);
    #grey = new BABYLON.Color3(0.8, 0.8, 0.8);

    constructor(size) {
        this.size = size;

        this.#meshMap = new Array(size);
        this.#cellMap = new Array(size);

        for (let i = 0; i < size; ++i) {
            this.#meshMap[i] = new Array(size);
            this.#cellMap[i] = new Array(size);
        }
        this.#initCellMap();
    };

    #createMaterial(i, j, scene) {
        let mat = new BABYLON.StandardMaterial((i).toString() + (j).toString(), scene);
        mat.alpha = 1;
        return mat;
    };

    #initCellMap() {
        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                this.#cellMap[i][j] = false;
            }
        }
    };

    #resetMaterial() {
        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                if (this.#cellMap[i][j]) {
                    this.#meshMap[i][j].material.diffuseColor = this.#red;
                    this.#meshMap[i][j].position.y = 0.5;
                } else {
                    this.#meshMap[i][j].material.diffuseColor = this.#grey;
                    this.#meshMap[i][j].position.y = 0;
                }
            }
        }
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
            }
        }
        this.#resetMaterial();
    };

    toggleCell(x, y) {
        x = Math.floor(x + 0.25);
        y = Math.floor(y + 0.25);
        if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
            this.#cellMap[x][y] = !this.#cellMap[x][y];
            this.#resetMaterial();
        }
    };

    toggleSimulation() {
        this.#isRunning = !this.#isRunning;
    };

    clear() {
        this.#initCellMap();
        this.#resetMaterial();
    }

    #updateMesh(temp, row, col) {
        let mesh = this.#meshMap[row][col];

        if (temp[row][col]) {
            mesh.material.diffuseColor = this.#red;
            mesh.position.y = 0.5;
        } else {
            mesh.material.diffuseColor = this.#grey;
            mesh.position.y = 0;
        }
    }

    update() {
        if (!this.#isRunning) {
            return;
        }

        let temp = new Array(this.size);
        for (let i = 0; i < this.size; ++i) {
            temp[i] = this.#cellMap[i].slice(0);
        }

        for (let row = 0; row < this.size; ++row) {
            for (let col = 0; col < this.size; ++col) {
                let rowMinus = row - 1;
                if (rowMinus < 0) {
                    rowMinus = this.size - 1;
                }

                let colMinus = col - 1;
                if (colMinus < 0) {
                    colMinus = this.size - 1;
                }

                let rowPlus = row + 1;
                if (rowPlus >= this.size) {
                    rowPlus = 0;
                }

                let colPlus = col + 1;
                if (colPlus >= this.size) {
                    colPlus = 0;
                }

                let count = (this.#cellMap[rowMinus][colMinus]
                    + this.#cellMap[row][colMinus]
                    + this.#cellMap[rowPlus][colMinus]
                    + this.#cellMap[rowMinus][col]
                    + this.#cellMap[rowPlus][col]
                    + this.#cellMap[rowMinus][colPlus]
                    + this.#cellMap[row][colPlus]
                    + this.#cellMap[rowPlus][colPlus]);

                if (this.#cellMap[row][col]) {
                    switch (count) {
                        case 0:
                        case 1:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            temp[row][col] = false;
                            break;
                        default:
                            break;
                    }
                } else if (count === 3) {
                    temp[row][col] = true;
                }

                this.#updateMesh(temp, row, col);
            }
        }

        for (let i = 0; i < this.size; ++i) {
            this.#cellMap[i] = temp[i].slice(0);
        }
    };
}

function createGlider(caMap) {
    //Left square
    caMap.toggleCell(1, 30);
    caMap.toggleCell(2, 30);
    caMap.toggleCell(1, 29);
    caMap.toggleCell(2, 29);

    // Left Ship
    caMap.toggleCell(11, 30);
    caMap.toggleCell(11, 29);
    caMap.toggleCell(11, 28);
    caMap.toggleCell(12, 31);
    caMap.toggleCell(12, 27);
    caMap.toggleCell(13, 32);
    caMap.toggleCell(13, 26);
    caMap.toggleCell(14, 32);
    caMap.toggleCell(14, 26);
    caMap.toggleCell(15, 29);
    caMap.toggleCell(16, 31);
    caMap.toggleCell(16, 27);
    caMap.toggleCell(17, 30);
    caMap.toggleCell(17, 29);
    caMap.toggleCell(17, 28);
    caMap.toggleCell(18, 29);

    // Right Ship
    caMap.toggleCell(21, 32);
    caMap.toggleCell(21, 31);
    caMap.toggleCell(21, 30);
    caMap.toggleCell(22, 32);
    caMap.toggleCell(22, 31);
    caMap.toggleCell(22, 30);
    caMap.toggleCell(23, 33);
    caMap.toggleCell(23, 29);
    caMap.toggleCell(25, 34);
    caMap.toggleCell(25, 33);
    caMap.toggleCell(25, 29);
    caMap.toggleCell(25, 28);

    // Right square
    caMap.toggleCell(35, 32);
    caMap.toggleCell(35, 31);
    caMap.toggleCell(36, 32);
    caMap.toggleCell(36, 31);
}


const createMap = function (scene, mapSize) {
    let caMap = new CA_Graph(mapSize);

    caMap.createMesh(scene);

    createGlider(caMap);

    scene.onPointerDown = function (event, result) {
        if (event.button === 2) {
            caMap.toggleSimulation();
        } else if (event.button === 0) {
            caMap.toggleCell(result.pickedPoint.x, result.pickedPoint.z);
        } else if (event.button === 1) {
            caMap.clear();
        }
    }

    return caMap;
}

// Add your code here matching the playground format
let mapSize = 38;
const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(mapSize / 2, 0, mapSize / 2));
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 60;
    camera.position = new BABYLON.Vector3(mapSize / 2, 50, 0);
    camera.attachControl(canvas, true, false);
    camera.panningSensibility = 0;

    const ambient = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(mapSize / 2, 3, mapSize / 2));
    const dirLight = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(0, -1, 0), scene);
    dirLight.intesity = 0.5;

    return scene;
};

const scene = createScene(); //Call the createScene function
const caMap = createMap(scene, mapSize);

let updateTimer = 0.1;

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
    updateTimer -= scene.deltaTime / 1000;

    if (updateTimer <= 0) {
        caMap.update();
        updateTimer = 0.1;
    }
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
