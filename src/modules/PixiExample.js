import * as PIXI from 'pixi.js';

/**
 * Boilerplate module using PIXI.js
 */

class PixiExample {
  constructor(options = {
    appContainerSelector: '[data-app-container]',
  }) {
    this.options = options;
    this.appContainer = document.querySelector(this.options.appContainerSelector);
    this.app = null;
    this.particleContainer = null;

    // Settings
    this.settings = {
      // Tweakable settings go here
      rotationSpeed: 0.01,
    };

    this.init();
  }

  init = () => {
    this.createGui();
    this.createApp();
    this.createItems();
  }

  createGui = () => {
    if (!window.APP.gui) return;

    const folder = window.APP.gui.setFolder('PixiExample');
    folder.open();

    window.APP.gui.add(this.settings, 'rotationSpeed', 0.005, 0.3);
  }

  createApp = () => {
    this.app = new PIXI.Application({
      backgroundColor: 0x212322,
      width: 1000,
      height: 1000,
    });
    this.appContainer.appendChild(this.app.view);
    this.app.ticker.add(this.render);
  }

  createItems = () => {
    // Create the particle container
    this.particleContainer = new PIXI.ParticleContainer(700, {
      position: true,
      rotation: true,
      scale: true,
      alpha: true,
    });
    this.app.stage.addChild(this.particleContainer);

    const path = [0, 0, 0, 50, 50, 0, 0, 0];
    const textureGraphic = new PIXI.Graphics();
    textureGraphic.lineStyle(0);
    textureGraphic.beginFill(0x1a1b1b);
    textureGraphic.drawPolygon(path);
    textureGraphic.endFill();
    let spriteTexture = this.app.renderer.generateTexture(textureGraphic);

    const itemCount = 20;
    for (let idx = 0, length = itemCount; idx < length; idx++) {
      const sprite = new PIXI.Sprite(spriteTexture);
      sprite.anchor.set(0.5, 0.5);
      this.particleContainer.addChild(sprite);
      sprite.position.x = Math.random() * this.app.view.width;
      sprite.position.y = Math.random() * this.app.view.height;
    }
  }

  render = (delta) => {
    this.particleContainer.children.forEach(child => {
      child.rotation += this.settings.rotationSpeed;
    });
  }
}

export default PixiExample;
