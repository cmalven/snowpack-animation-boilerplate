uniform float iter;
uniform vec2 currentMouse;
varying vec2 vUv;

// From THREE…
// uniform vec3 cameraPosition;
// attribute vec3 position;
// attribute vec2 uv;

float easeIn(float t) {
  return t * t;
}

float lerp(float start, float end, float pct) {
  return (start + (end - start) * pct);
}

void main() {
  float dist = lerp(1.0, 0.0, distance(uv.x, currentMouse.x));

  vec3 adjustedPosition = vec3(
    position.x,
    position.y,
    position.z + sin(iter * 0.04 + uv.x*10.0) * dist * 10.0
  );

  vec4 mvPosition = modelViewMatrix * vec4(adjustedPosition, 1.0);

  vUv = uv;

  gl_Position = projectionMatrix * mvPosition;
}