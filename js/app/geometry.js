define( ["three"], function ( THREE ) {
  return {
    cube: new THREE.CubeGeometry( 200, 200, 200 ),
    sky: new THREE.PlaneGeometry( 1600, 1600 ),
    sky2: new THREE.SphereGeometry( 3000, 64, 64 )
  };
} );
