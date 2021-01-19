uniform sampler2D imageTexture;
uniform float iter;
uniform vec2 currentMouse;
varying vec2 vUv;
varying vec3 vPosition;

// From THREE…
// uniform vec3 cameraPosition;

void main() {
  float u = vUv.x;
  float v = vUv.y;
  vec2 newUv = vec2(u, v);

  float r = texture2D(imageTexture, newUv).r;
  float g = texture2D(imageTexture, newUv).g;
  float b = texture2D(imageTexture, newUv).b;

  vec3 texture = vec3(r, g, b);

  gl_FragColor = vec4(texture, 1.0);
}