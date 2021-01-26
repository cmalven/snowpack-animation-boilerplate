#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
uniform float uTime;
uniform sampler2D uSampler0;

void main() {
  float u = vTextureCoord.x;
  float v = vTextureCoord.y;
  vec2 newUv = vec2(u, v);

  // Distort texture
  newUv.x += sin(newUv.y * 25.0) * cos(newUv.x * 25.0) * (cos(uTime / 50.0)) / 25.0;

  // Add highlight based on z position
  float zHighlight = vVertexPosition.z * 1.0;

  float r = texture2D(uSampler0, newUv).r + zHighlight;
  float g = texture2D(uSampler0, newUv).g + zHighlight;
  float b = texture2D(uSampler0, newUv).b + zHighlight;

  vec3 texture = vec3(r, g, b);

  gl_FragColor = vec4(texture, 1.0);
}