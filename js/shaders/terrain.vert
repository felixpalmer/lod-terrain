uniform int uEdgeMorph;

uniform vec3 uGlobalOffset;
uniform sampler2D uHeightData;
uniform vec2 uOffset;
uniform float uScale;

varying vec3 vNormal;
varying vec3 vPosition;

// Number of vertices along edge of tile
#define TILE_RESOLUTION 128.0
float tileResolution = TILE_RESOLUTION;

float getHeight(vec3 p) {
  // Assume a 1024x1024 world
  float lod = 0.0;//log2(uScale) - 6.0;
  vec2 st = p.xy / 1024.0;

  // Sample multiple times to get more detail out of map
  float h = 1024.0 * texture2DLod(uHeightData, st, lod).a;
  h += 64.0 * texture2DLod(uHeightData, 16.0 * st, lod).a;
  h += 4.0 * texture2DLod(uHeightData, 256.0 * st, lod).a;

  // Square the height, leads to more rocky looking terrain
  return h * h / 2000.0;
  //return h / 10.0;
}

vec3 getNormal() {
  // Get 2 vectors perpendicular to the unperturbed normal, and create at point at each (relative to position)
  //float delta = 1024.0 / 4.0;
  float delta = uScale / tileResolution;
  vec3 dA = delta * normalize(cross(normal.yzx, normal));
  vec3 dB = delta * normalize(cross(dA, normal));
  vec3 p = vPosition;
  vec3 pA = vPosition + dA;
  vec3 pB = vPosition + dB;

  // Now get the height at those points
  float h = getHeight(vPosition);
  float hA = getHeight(pA);
  float hB = getHeight(pB);

  // Update the points with their correct heights and calculate true normal
  p += normal * h;
  pA += normal * hA;
  pB += normal * hB;
  return normalize(cross(pB - p, pA - p));
}

#define EGDE_MORPH_TOP 1
#define EGDE_MORPH_LEFT 2
#define EGDE_MORPH_BOTTOM 4
#define EGDE_MORPH_RIGHT 8
// At the edges of tiles morph the vertices, if they are joining onto a higher layer
float calculateMorph(vec3 p) {
  if ( (uEdgeMorph == EGDE_MORPH_TOP && position.y == 1.0 ) ||
       (uEdgeMorph == EGDE_MORPH_LEFT && position.x == 0.0 ) ||
       (uEdgeMorph == EGDE_MORPH_BOTTOM && position.y == 0.0 ) ||
       (uEdgeMorph == EGDE_MORPH_RIGHT && position.x == 1.0 ) ) {
    // Bordering with next layer, half our resolution, so we snap to the same locations
    // as the bordering layer
    return TILE_RESOLUTION / 2.0;
  }


  return TILE_RESOLUTION;
}

void main() {
  tileResolution = calculateMorph(position);

  // Move into correct place
  vPosition = uScale * position + vec3(uOffset, 0.0) + uGlobalOffset;

  // Snap to grid
  float grid = uScale / tileResolution;
  vPosition = floor(vPosition / grid) * grid;

  // Get height and calculate normal
  vPosition = vPosition + normal * getHeight(vPosition);
  vNormal = getNormal();
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}
