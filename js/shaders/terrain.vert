#include shift.glsl

void main() {
  // Example usage of included file, see shift.glsl for function definition
  vec3 shiftedPosition = shift(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(shiftedPosition, 1.0);
}
