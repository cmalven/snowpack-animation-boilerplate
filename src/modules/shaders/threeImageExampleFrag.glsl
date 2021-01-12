uniform sampler2D imageTexture;
uniform float iter;
uniform vec2 currentMouse;
varying vec2 vUv;

// From THREE…
// uniform vec3 cameraPosition;

void main() {
  gl_FragColor = texture2D(imageTexture, vUv);
}