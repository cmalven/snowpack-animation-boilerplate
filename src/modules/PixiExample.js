import * as PIXI from 'pixi.js';
import colors from 'nice-color-palettes';

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
    this.iter = 0;

    // Settings
    this.settings = {
      scalePeriod: 250,
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

    window.APP.gui.add(this.settings, 'scalePeriod', 1, 1000);
  }

  createApp = () => {
    this.app = new PIXI.Application({
      backgroundColor: 0x212322,
      width: 1000,
      height: 1000,
    });
    this.appContainer.appendChild(this.app.view);
    this.app.ticker.add(this.update);
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

    // Get the color palette
    const palette = colors[Math.floor(Math.random() * 50)];

    const textureGraphic = new PIXI.Graphics();
    textureGraphic.lineStyle(0);
    textureGraphic.beginFill(0xeeeeee);
    textureGraphic.drawEllipse(0, 0, 30, 30);
    textureGraphic.endFill();
    let spriteTexture = this.app.renderer.generateTexture(textureGraphic);

    const itemCount = 200;
    for (let idx = 0, length = itemCount; idx < length; idx++) {
      const randColor = palette[Math.floor(Math.random() * palette.length)];
      const sprite = new PIXI.Sprite(spriteTexture);
      sprite.baseScale = Math.random();
      sprite.anchor.set(0.5, 0.5);
      sprite.position.x = Math.random() * this.app.view.width;
      sprite.position.y = Math.random() * this.app.view.height;
      sprite.tint = PIXI.utils.string2hex(randColor);
      this.particleContainer.addChild(sprite);
    }
  }

  updateItems = () => {
    this.particleContainer.children.forEach(sprite => {
      const iteration = this.iter + sprite.baseScale * this.settings.scalePeriod;
      const amplitude = 0.8;
      const period = this.settings.scalePeriod;

      const scaleEffect = amplitude * Math.sin((Math.PI * 2) * (iteration / period));
      sprite.scale.x = sprite.scale.y = scaleEffect + sprite.baseScale;
    });
  }

  update = () => {
    this.iter++;
    this.updateItems();
  }
}

export default PixiExample;
