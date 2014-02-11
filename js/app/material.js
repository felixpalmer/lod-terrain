define( ["three", "noise", "shader!terrain.vert", "shader!terrain.frag", "texture"],
function ( THREE, noise, terrainVert, terrainFrag, texture ) {
  return {
    terrain: function () {
      return new THREE.ShaderMaterial( {
        uniforms: {
          uHeightData: { type: "t", value: noise },
          uScale: { type: "f", value: 1.0 },
          uOffset: { type: "v2", value: new THREE.Vector2(0, 0) }
        },
        vertexShader: terrainVert.value,
        fragmentShader: terrainFrag.value
      });
    }
  };
} );
