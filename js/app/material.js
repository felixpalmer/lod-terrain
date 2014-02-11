define( ["three", "noise", "shader!terrain.vert", "shader!terrain.frag", "texture"],
function ( THREE, noise, terrainVert, terrainFrag, texture ) {
  return {
    terrain: new THREE.ShaderMaterial( {
      uniforms: {
        uHeightData: { type: "t", value: noise }
      },
      vertexShader: terrainVert.value,
      fragmentShader: terrainFrag.value
    })
  };
} );
