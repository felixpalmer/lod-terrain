define( ["three", "shader!terrain.vert", "shader!terrain.frag", "texture"], function ( THREE, terrainVert, terrainFrag, texture ) {
  return {
    terrain: new THREE.ShaderMaterial( {
      uniforms: {
      },
      vertexShader: terrainVert.value,
      fragmentShader: terrainFrag.value
    })
  };
} );
