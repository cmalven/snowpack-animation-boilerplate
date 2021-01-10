export default `
uniform sampler2D pointTexture;
varying float vAlpha;

void main() {
  if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.5 ) discard;
  gl_FragColor = vec4(
    1.0,
    1.0,
    1.0,
    vAlpha
  );
}
`;