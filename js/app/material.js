define( ["three", "shader!atmosphere.vert", "shader!atmosphere.frag", "texture"],
function ( THREE, atmosphereVert, atmosphereFrag, texture ) {
  return {
    atmosphere: new THREE.ShaderMaterial( {
      uniforms: {
        uHorizonColor: { type: "c", value: new THREE.Color( 0xfff1d8 ) },
        //uSkyColor: { type: "c", value: new THREE.Color( 0xd1e3f1 ) }
        uSkyColor: { type: "c", value: new THREE.Color( 0xf9f9ff ) }
      },
      vertexShader: atmosphereVert.value,
      fragmentShader: atmosphereFrag.value,
      side: THREE.BackSide
    } ),
    sky: new THREE.MeshBasicMaterial( {
      map: texture.sky,
      side: THREE.BackSide
    } )
  };
} );
