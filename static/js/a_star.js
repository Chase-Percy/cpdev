window.onerror = function (message, url, linenumber) {
    alert('JavaScript error: ' + message + ' on line ' + linenumber + ' for ' + url);
}

import {graph} from "./graph.js";

const canvas = window.document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

function createGraph(scene, mapSize) {
    let g = new graph(mapSize, [1, 1], [9, 4]);

    g.createMesh();

    g.setNodeBlock(3, 1, true);
    g.setNodeBlock(3, 3, true);
    g.setNodeBlock(3, 4, true);
    g.setNodeBlock(3, 5, true);
    g.setNodeBlock(3, 2, true);
    g.setNodeBlock(4, 3, true);

    scene.onPointerDown = function (event, result) {
        if (event.button === 2) {
            g.toggleObjectiveBlocks(result.pickedPoint.x, result.pickedPoint.z);
        } else if (event.button === 0) {
            g.toggleNodeBlock(result.pickedPoint.x, result.pickedPoint.z);
        }
    }
}

// Add your code here matching the playground format
const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    let mapSize = 10;
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(mapSize / 2, 0, mapSize / 2));
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 30;
    camera.position = new BABYLON.Vector3(-1, 9, 12);
    camera.attachControl(canvas, true, false);
    camera.panningSensibility = 0;

    const ambient = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(mapSize / 2, 3, mapSize / 2));
    const dirLight = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(0, -1, 0), scene);
    dirLight.intesity = 0.5;

    createGraph(scene, mapSize);

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
