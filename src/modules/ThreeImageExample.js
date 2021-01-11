import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertShader from './shaders/threeImageExampleVert.glsl';
import fragShader from './shaders/threeImageExampleFrag.glsl';

/**
 * Boilerplate module using THREE.js
 */

class ThreeImageExample {
  constructor(options = {
    appContainerSelector: '[data-app-container]',
  }) {
    this.options = options;
    this.appContainer = document.querySelector(this.options.appContainerSelector);
    this.iter = 0;

    // THREE items
    this.renderer;
    this.camera;
    this.scene;
    this.controls;
    this.imageTexture;
    this.uniforms;
    this.geometry;
    this.mesh;

    // Settings
    this.settings = {
      cameraDistance: 100,
      bgColor: 0x212322,
    };

    this.init();
  }

  init = async() => {
    this.createGui();
    await this.loadTexture();
    this.createUniforms();
    this.createApp();
    this.createItems();
    this.update();
  }

  createGui = () => {
    if (!window.APP.gui) return;

    const folder = window.APP.gui.setFolder('ThreeExample');
    folder.open();

    // window.APP.gui.add(this.settings, 'minSize', 1, 90);
  }

  loadTexture = async() => {
    this.imageTexture = await new THREE.TextureLoader().load('https://assets.codepen.io/66496/temple-ranch-hero.jpg');
  }

  createUniforms = () => {
    this.uniforms = {
      imageTexture: { value: this.imageTexture },
    };
    this.updateUniforms();
  }

  updateUniforms = () => {
    Object.assign(this.uniforms, {}, {
      iter: { value: this.iter },
    });
  }

  createApp = () => {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      devicePixelRatio: 1.5,
      antialias: false,
    });
    this.renderer.setSize(this.appContainer.offsetWidth, this.appContainer.offsetHeight);
    this.appContainer.appendChild(this.renderer.domElement);

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, this.appContainer.offsetWidth / this.appContainer.offsetHeight, 1, 10000);
    this.camera.position.set(-3, 2, this.settings.cameraDistance);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.settings.bgColor);

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableKeys = false;
    this.controls.enableZoom = false;
    this.controls.enableDamping = false;

    // Resize the renderer on window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = this.appContainer.offsetWidth / this.appContainer.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.appContainer.offsetWidth, this.appContainer.offsetHeight);
    }, true);
  }

  createItems = () => {
    // Create the geometry
    const imageRatio = 1304 / 2000;
    const imageWidth = 60;
    this.geometry = new THREE.PlaneBufferGeometry(imageWidth, imageWidth * imageRatio, 16 * 2, 9 * 2);

    // Create the material
    let shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      depthTest: false,
      transparent: true,
      vertexColors: true,
      side: THREE.DoubleSide,
    });

    // Create the mesh
    this.mesh = new THREE.Mesh(this.geometry, shaderMaterial);

    // Add mesh to the scene
    this.scene.add(this.mesh);
  }

  updateItems = () => {

  }

  update = () => {
    this.iter++;
    this.updateUniforms();
    this.updateItems();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.update);

  }
}

export default ThreeImageExample;