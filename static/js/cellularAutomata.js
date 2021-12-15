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
        this.initCellMap();
    };

    createMaterial(i, j, scene) {
        let mat = new BABYLON.StandardMaterial((i).toString() + (j).toString(), scene);
        mat.alpha = 1;
        return mat;
    };

    initCellMap() {
        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                this.#cellMap[i][j] = false;
            }
        }
    };

    resetMaterial() {
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
                    this.#meshMap[i][j].material = this.createMaterial(i, j, scene);
                }
            }
        }
        this.resetMaterial();
    };

    toggleCell(x, y) {
        x = Math.floor(x + 0.25);
        y = Math.floor(y + 0.25);
        if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
            this.#cellMap[x][y] = !this.#cellMap[x][y];
            this.resetMaterial();
        }
    };

    setCell(x, y, active, update) {
        if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
            this.#cellMap[x][y] = active;
            if (update) {
                this.resetMaterial();
            }
        }
    }

    setSimulation(isRunningSetter) {
        this.#isRunning = isRunningSetter;
    };

    clear() {
        this.initCellMap();
        this.resetMaterial();
    };

    updateMesh(temp, row, col) {
        let mesh = this.#meshMap[row][col];

        if (temp[row][col]) {
            mesh.material.diffuseColor = this.#red;
            mesh.position.y = 0.5;
        } else {
            mesh.material.diffuseColor = this.#grey;
            mesh.position.y = 0;
        }
    };

    update() {
        if (!this.#isRunning) {
            return;
        }

        let temp = new Array(this.size);
        for (let i = 0; i < this.size; ++i) {
            temp[i] = this.#cellMap[i].slice(0);
        }

        let populated = false;

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

                if (count > 0) {
                    populated = true;
                }

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

                this.updateMesh(temp, row, col);
            }
        }

        if (populated) {
            for (let i = 0; i < this.size; ++i) {
                this.#cellMap[i] = temp[i].slice(0);
            }
        } else {
            this.clear();
            this.setSimulation(false);
            document.getElementById('status').innerHTML = "<h3>Status: Not Running</h3>";
        }
    };
}

function createPenta(caMap) {
    caMap.setCell(5, 15, true, false);
    caMap.setCell(4, 14, true, false);
    caMap.setCell(5, 14, true, false);
    caMap.setCell(6, 14, true, false);

    caMap.setCell(4, 11, true, false);
    caMap.setCell(5, 11, true, false);
    caMap.setCell(6, 11, true, false);

    caMap.setCell(4, 9, true, false);
    caMap.setCell(4, 8, true, false);
    caMap.setCell(6, 9, true, false);
    caMap.setCell(6, 8, true, false);

    caMap.setCell(4, 6, true, false);
    caMap.setCell(5, 6, true, false);
    caMap.setCell(6, 6, true, false);

    caMap.setCell(5, 3, true, false);
    caMap.setCell(4, 3, true, false);
    caMap.setCell(6, 3, true, false);
    caMap.setCell(5, 2, true, true);
}


const createMap = function (scene, mapSize) {
    let caMap = new CA_Graph(mapSize);

    caMap.createMesh(scene);

    createPenta(caMap);

    scene.onPointerDown = function (event, result) {
        if (event.button === 0) {
            caMap.toggleCell(result.pickedPoint.x, result.pickedPoint.z);
        }
    }

    return caMap;
};

// Add your code here matching the playground format
let mapSize = 18;
const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(mapSize / 2, 24, 0), scene);
    camera.setTarget(new BABYLON.Vector3(mapSize / 2, 0, mapSize / 2));

    const ambient = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(mapSize / 2, 3, mapSize / 2));
    const dirLight = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(-2, -1, 0), scene);
    dirLight.intesity = 0.01;

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

document.getElementById('start').onclick = function () {
    caMap.setSimulation(true);
    document.getElementById('status').innerHTML = "<h3>Status: Running</h3>";
};

document.getElementById('stop').onclick = function () {
    caMap.setSimulation(false);
    document.getElementById('status').innerHTML = "<h3>Status: Not Running</h3>";
};


document.getElementById('reset').onclick = function () {
    caMap.clear();
    caMap.setSimulation(false);
    document.getElementById('status').innerHTML = "<h3>Status: Reset (Not Running)</h3>";
};
