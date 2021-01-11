import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertShader from './shaders/threeParticleExampleVert.glsl';
import fragShader from './shaders/threeParticleExampleFrag.glsl';

/**
 * Boilerplate module using THREE.js
 */

class ThreeParticleExample {
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
    this.geometry;
    this.particles;
    this.pointTexture;
    this.uniforms;

    // Settings
    this.settings = {
      cameraDistance: 100,
      minSize: 5,
      maxSize: 25,
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

    window.APP.gui.add(this.settings, 'minSize', 1, 90);
    window.APP.gui.add(this.settings, 'maxSize', 1, 90);
  }

  loadTexture = async() => {
    this.pointTexture = await new THREE.TextureLoader().load('https://assets.codepen.io/66496/dot.png');
  }

  createUniforms = () => {
    this.uniforms = {
      pointTexture: { value: this.pointTexture },
    };
    this.updateUniforms();
  }

  updateUniforms = () => {
    Object.assign(this.uniforms, {}, {
      iter: { value: this.iter },
      minSize: { value: this.settings.minSize },
      maxSize: { value: this.settings.maxSize },
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
    this.geometry = new THREE.BufferGeometry();

    // Create the material
    let shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertShader,
      fragmentShader: fragShader,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    // Set particle variables
    const numItems = 800;
    const positions = new Float32Array(numItems * 3);
    const sizes = new Float32Array(numItems);
    const indexes = new Float32Array(numItems);

    for (let idx = 0, length = numItems; idx < length; idx++) {
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      const z = Math.random() * 100 - 50;
      positions[idx*3] = x;
      positions[idx*3 + 1] = y;
      positions[idx*3 + 2] = z;
      sizes[idx] = Math.random();
      indexes[idx] = idx;
    }

    // Set buffer attributes
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
    this.geometry.setAttribute('index', new THREE.BufferAttribute(indexes, 1).setUsage(THREE.DynamicDrawUsage));
    this.particles = new THREE.Points(this.geometry, shaderMaterial);

    // Add particles to the scene
    this.scene.add(this.particles);
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

export default ThreeParticleExample;
