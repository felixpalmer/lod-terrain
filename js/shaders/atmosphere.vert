varying float vDistance;

void main() {
  vDistance = distance( cameraPosition, position );
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
