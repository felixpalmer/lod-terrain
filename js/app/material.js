define( ["three", "shader!atmosphere.vert", "shader!atmosphere.frag", "texture"],
function ( THREE, atomsphereVert, atomsphereFrag, texture ) {
  return {
    atmosphere: new THREE.ShaderMaterial( {
      uniforms: {
        uHorizonColor: { type: "c", value: new THREE.Color( 0xfff1d8 ) },
        //uSkyColor: { type: "c", value: new THREE.Color( 0xd1e3f1 ) }
        uSkyColor: { type: "c", value: new THREE.Color( 0xf9f9ff ) }
      },
      vertexShader: atomsphereVert.value,
      fragmentShader: atomsphereFrag.value,
      side: THREE.BackSide
    } ),
    sky: new THREE.MeshBasicMaterial( {
      //fog: true,
      map: texture.sky,
      side: THREE.DoubleSide
    } )
  };
} );
