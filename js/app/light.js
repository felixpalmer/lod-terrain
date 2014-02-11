define( ["three", "scene"], function ( THREE, scene ) {
  var light = new THREE.DirectionalLight( 0xff3bff );
  light.position.set( 0, 0, 300 );
  scene.add( light );
  return light;
} );
