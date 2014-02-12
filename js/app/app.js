define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, geometry, light, material, renderer, scene ) {
  var app = {
    clock: new THREE.Clock(),
    offset: new THREE.Vector3( 0, 0, 0 ),
    init: function () {

      var worldWidth = 1024;

      var createTile = function ( x, y, scale ) {
        var plane = new THREE.Mesh( geometry.plane, material.terrain() );
        plane.material.uniforms.uOffset.value.x = x;
        plane.material.uniforms.uOffset.value.y = y;
        plane.material.uniforms.uGlobalOffset.value = app.offset;
        plane.material.uniforms.uScale.value = scale;
        scene.add( plane );
      };

      createTile( 0, 0, 1 );
      for ( var scale = 16; scale < worldWidth; scale *= 2 ) {
        createTile( -2 * scale, -2 * scale, scale );
        createTile( -2 * scale, -scale, scale );
        createTile( -2 * scale, 0, scale );
        createTile( -2 * scale, scale, scale );

        createTile( -scale, -2 * scale, scale );
        createTile( -scale, scale, scale );

        createTile( 0, -2 * scale, scale );
        createTile( 0, scale, scale );

        createTile( scale, -2 * scale, scale );
        createTile( scale, -scale, scale );
        createTile( scale, 0, scale );
        createTile( scale, scale, scale );
      }
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      //controls.update( app.clock.getDelta() );
      var time = app.clock.getElapsedTime();
      camera.position.x = 100 * Math.cos( time / 3 ) + 200;
      camera.position.y = 100 * Math.sin( time / 3 ) + 200;
      camera.lookAt( new THREE.Vector3( 25, 25, 0 ) );
      app.offset.x = camera.position.x;
      app.offset.y = camera.position.y;
      renderer.render( scene, camera );
    }
  };
  return app;
} );
