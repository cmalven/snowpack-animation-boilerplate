uniform sampler2D pointTexture;
uniform vec2 currentMouse;
varying float vAlpha;

// From THREE…
// uniform vec3 cameraPosition;

void main() {
  gl_FragColor = vec4(
    1.0,
    1.0,
    1.0,
    vAlpha * texture2D(pointTexture, gl_PointCoord).a
  );
}