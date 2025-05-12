import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class EmbeddedViewer {
  constructor(containerId = 'viewer-container') {
    this.container = document.getElementById(containerId) || document.body;
    this.currentModel = null;
    this.initScene();
    this.initLights();
    this.initControls();
    this.setupEventListeners();
    this.loadShelfModel();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.scene.fog = new THREE.Fog(0xffffff, 1, 30);
    const roomSize = 40;
    const gridHelper = new THREE.GridHelper(roomSize, 40, 0xcccccc, 0xe6e6e6);
    gridHelper.position.y = -1.4;
    this.scene.add(gridHelper);
    const backWallGeometry = new THREE.PlaneGeometry(roomSize, roomSize/2);
    const backWallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xe0e0e0,
      side: THREE.FrontSide,
      roughness: 0.8,
      metalness: 0.1
    });
    const backWallMesh = new THREE.Mesh(backWallGeometry, backWallMaterial);
    backWallMesh.position.z = -roomSize/4;
    backWallMesh.position.y = roomSize/4 - 1.4;
    this.scene.add(backWallMesh);
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.container.clientWidth / this.container.clientHeight, 
      0.1, 
      1000
    );
    this.camera.position.set(5.10, 4.85, 9.99);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
    this.scene.add(hemisphereLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(1, 1, 2);
    this.scene.add(mainLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(0, 1, -1);
    this.scene.add(backLight);
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 20;
    this.controls.target.set(1.28, 3.82, 0.12);
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN
    };
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minAzimuthAngle = -Infinity;
    this.controls.maxAzimuthAngle = Infinity;
    this.controls.enablePan = true;
    this.controls.panSpeed = 0.5;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
  }

  async loadShelfModel() {
    const loader = new OBJLoader();
    loader.load('./models/Shelf.obj', (mesh) => {
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x808080,
            flatShading: false,
            roughness: 0.7,
            metalness: 0.3
          });
        }
      });
      mesh.scale.set(0.005, 0.005, 0.005);
      const bbox = new THREE.Box3().setFromObject(mesh);
      mesh.position.y = -bbox.min.y * mesh.scale.y + 8.529;
      this.scene.add(mesh);
      this.currentModel = mesh;
    });
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.controls) {
      this.controls.dispose();
    }
    this.currentModel = null;
    this.scene = null;
    this.camera = null;
    this.renderer.dispose();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const viewer = new EmbeddedViewer('viewer-container');
  viewer.animate();
  window.embeddedViewer = viewer;
}); 