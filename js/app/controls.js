define( ["three", "camera", "container"], function( THREE, camera, container ) { 
  controls = new THREE.TrackballControls( camera, container );
  return controls;
} );
