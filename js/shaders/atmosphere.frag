uniform vec3 uHorizonColor;
uniform vec3 uSkyColor;

varying float vDistance;

void main() {
  // Not the best gradient effect....
  float blend = smoothstep( 1000.0, 2000.0, gl_FragCoord.y );
  vec3 color = mix( uHorizonColor, uSkyColor, blend );
  gl_FragColor = vec4( color, 1.0 );
}
