uniform int uEdgeMorph;

#define EGDE_MORPH_TOP 1
#define EGDE_MORPH_LEFT 2
#define EGDE_MORPH_BOTTOM 4
#define EGDE_MORPH_RIGHT 8

// Poor man's bitwise &
bool edgePresent(int edge) {
  int e = uEdgeMorph / edge;
  return 2 * ( e / 2 ) != e;
}

#define MORPH_REGION 0.3

// At the edges of tiles morph the vertices, if they are joining onto a higher layer
float calculateMorph(vec3 p) {
  float morphFactor = 0.0;
  if( edgePresent(EGDE_MORPH_TOP) && p.y >= 1.0 - MORPH_REGION ) {
    float m = 1.0 - clamp((1.0 - p.y) / MORPH_REGION, 0.0, 1.0);
    morphFactor = max(m, morphFactor);
  }
  if( edgePresent(EGDE_MORPH_LEFT) && p.x <= MORPH_REGION ) {
    float m = 1.0 - clamp(p.x / MORPH_REGION, 0.0, 1.0);
    morphFactor = max(m, morphFactor);
  }
  if( edgePresent(EGDE_MORPH_BOTTOM) && p.y <= MORPH_REGION ) {
    float m = 1.0 - clamp(p.y / MORPH_REGION, 0.0, 1.0);
    morphFactor = max(m, morphFactor);
  }
  if( edgePresent(EGDE_MORPH_RIGHT) && p.x >= 1.0 - MORPH_REGION ) {
    float m = 1.0 - clamp((1.0 - p.x) / MORPH_REGION, 0.0, 1.0);
    morphFactor = max(m, morphFactor);
  }

  return morphFactor;
}
