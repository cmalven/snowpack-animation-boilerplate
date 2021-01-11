uniform float iter;
varying vec2 vUv;

// From THREE…
// uniform vec3 cameraPosition;
// attribute vec3 position;

void main() {
  vec3 adjustedPosition = vec3(
    position.x,
    position.y,
    position.z + sin(iter * 0.06 + distance(vec2(0, 0), position.xy)) * 5.0
  );

  vec4 mvPosition = modelViewMatrix * vec4(adjustedPosition, 1.0);

  vUv = uv;

  gl_Position = projectionMatrix * mvPosition;
}