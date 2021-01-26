#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
uniform float uTime;
uniform sampler2D uSampler0;

void main() {
  vec2 textureCoord = vTextureCoord;

  // Distort texture coordinates (as an example)
  textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;

  // map our texture with the texture matrix coords
  gl_FragColor = texture2D(uSampler0, textureCoord);
}