uniform sampler2D uHeightData;
varying vec2 vUv;

float getHeight() {
  float h = 10.0 * texture2D(uHeightData, vUv).a;
  return h;
}

void main() {
  vUv = uv;
  vec3 displacedPosition = position + normal * getHeight();
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
