define( ["three"], function ( THREE ) {
  return {
    cube: new THREE.CubeGeometry( 200, 200, 200 ),
    plane: new THREE.PlaneGeometry( 1024, 1024, 512, 512 )
  };
} );
