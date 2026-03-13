import * as THREE from "three";
import "./style.css";

import { setupScene } from "./scene/setupScene.js";
import { NodeField } from "./visuals/nodes.js";
import { MouseController } from "./controls/mouseController.js";
import { CircleAgent } from "./visuals/circleAgent.js";
import { CONFIG } from "./utils/config.js";

const { scene, camera, renderer } = setupScene();

const timer = new THREE.Timer();
const nodeField = new NodeField(scene);
const mouseController = new MouseController(camera);
const circleAgent = new CircleAgent(scene);

function animate() {
  requestAnimationFrame(animate);

  timer.update();

  const delta = timer.getDelta();
  const elapsedTime = timer.getElapsed();

  const targetWorld = mouseController.update();

  nodeField.update(delta, elapsedTime);
  circleAgent.update(targetWorld, elapsedTime);

  nodeField.interactWithCircle(
    circleAgent.group.position,
    CONFIG.circle.radius,
    elapsedTime,
  );

  renderer.render(scene, camera);
}

animate();
