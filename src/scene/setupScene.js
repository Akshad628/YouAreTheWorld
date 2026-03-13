import * as THREE from "three";
import { CONFIG } from "../utils/config.js";

export function setupScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(CONFIG.backgroundColor);

  const aspect = window.innerWidth / window.innerHeight;
  const frustumHeight = CONFIG.world.height;
  const frustumWidth = frustumHeight * aspect;

  const camera = new THREE.OrthographicCamera(
    -frustumWidth / 2,
    frustumWidth / 2,
    frustumHeight / 2,
    -frustumHeight / 2,
    0.1,
    1000,
  );

  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const app = document.getElementById("app");
  app.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumHeight = CONFIG.world.height;
    const frustumWidth = frustumHeight * aspect;

    camera.left = -frustumWidth / 2;
    camera.right = frustumWidth / 2;
    camera.top = frustumHeight / 2;
    camera.bottom = -frustumHeight / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  return { scene, camera, renderer };
}
