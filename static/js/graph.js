import node from './node';

class graph {
    #nodeMap
    #meshMap
    #red = new BABYLON.color3(0.8, 0, 0);
    #green = new BABYLON.color3(0, 0.8, 0);
    #blue = new BABYLON.color3(0, 0, 0.8);
    #grey = new BABYLON.color3(0.8, 0.8, 0.8);

    constructor(size, start, end) {
        this.start = start;
        this.end = end;
        this.size = size;

        this.#nodeMap = new Array(size);
        this.#meshMap = new Array(size);

        for (let i = 0; i < size; ++i) {
            this.#nodeMap[i] = new Array(size);
            this.#meshMap[i] = new Array(size);
        }
    }

    setNodeBlock(x, y, blocked) {
        this.#nodeMap[x][y].blocked = blocked;
        if (blocked) {
            this.#meshMap.color
        }
    }

    setNodeGFH(x, y, G, F, H) {
        this.#nodeMap[x][y].G = G;
        this.#nodeMap[x][y].F = F;
        this.#nodeMap[x][y].H = H;
    }

    createMesh() {
        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                this.#meshMap[i][j] = BABYLON.MeshBuilder.CreateBox((i).toString() + (j).toString(), {});
                this.#meshMap[i][j].position.x = i;
                this.#meshMap[i][j].position.z = j;

                console.log(this.#meshMap[i][j].position.x);
                console.log(this.#meshMap[i][j].position.z)

                if (i === this.start[0] && j === this.start[1]) {
                    this.#meshMap[i][j].material.diffuseColor = this.#red;
                } else if (i === this.end[0] && j === this.end[1]) {
                    this.#meshMap[i][j].material.diffuseColor = this.#green;
                } else {
                    this.#meshMap[i][j].material.diffuseColor = this.#grey;
                }
            }
        }
    }
}
