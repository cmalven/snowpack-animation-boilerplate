attribute float size;
attribute float index;
varying float vAlpha;
uniform float iter;
uniform float minSize;
uniform float maxSize;

// From THREE…
// uniform vec3 cameraPosition;
// attribute vec3 position;

float map_to_range(float value, float inMin, float inMax, float outMin, float outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

void main() {
  vec3 adjustedPosition = vec3(
    position.x,
    position.y + sin(iter * 0.02 + index) * pow(1.1, size * 10.0),
    position.z
  );

  vec4 mvPosition = modelViewMatrix * vec4(adjustedPosition, 1.0);

  gl_PointSize = map_to_range(size, 0.0, 1.0, minSize, maxSize);

  vAlpha = map_to_range(size, 0.0, 1.0, 0.2, 1.0);

  gl_Position = projectionMatrix * mvPosition;
}