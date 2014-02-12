uniform int uEdgeMorph;

#define EGDE_MORPH_TOP 1
#define EGDE_MORPH_LEFT 2
#define EGDE_MORPH_BOTTOM 4
#define EGDE_MORPH_RIGHT 8

bool edgePresent(int edge) {
  // Poor man's bitwise &
  int e = uEdgeMorph / edge;
  return 2 * ( e / 2 ) != e;
}

// At the edges of tiles morph the vertices, if they are joining onto a higher layer
float calculateMorph(vec3 p) {
  if( ( edgePresent(EGDE_MORPH_TOP) && position.y == 1.0 ) ||
      ( edgePresent(EGDE_MORPH_LEFT) && position.x == 0.0 ) ||
      ( edgePresent(EGDE_MORPH_BOTTOM) && position.y == 0.0 ) ||
      ( edgePresent(EGDE_MORPH_RIGHT) && position.x == 1.0 ) ) {
    // Bordering with next layer, half our resolution, so we snap to the same locations
    // as the bordering layer
    return 1.0;
  }

  return 0.0;
}
