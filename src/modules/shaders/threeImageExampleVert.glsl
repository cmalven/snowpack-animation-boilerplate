uniform float iter;
varying vec2 vUv;

// From THREE…
// uniform vec3 cameraPosition;
// attribute vec3 position;

void main() {
  vec3 adjustedPosition = vec3(
    position.x,
    position.y,
    position.z + sin(iter * 0.04 + uv*10.0) * 6.0
  );

  vec4 mvPosition = modelViewMatrix * vec4(adjustedPosition, 1.0);

  vUv = uv;

  gl_Position = projectionMatrix * mvPosition;
}