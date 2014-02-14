define( ["three", "camera", "controls", "geometry", "material", "renderer", "scene", "terrain"],
function ( THREE, camera, controls, geometry, material, renderer, scene, Terrain ) {

  var app = {
    clock: new THREE.Clock(),
    init: function () {

      // Add terrain
      var worldWidth = 1024;
      app.terrain = new Terrain( worldWidth, 3 );
      scene.add( app.terrain );

      // Add sky
      var sky = new THREE.Mesh( geometry.sky, material.sky );
      sky.position.z = 150;
      scene.add( sky );
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      //controls.update( app.clock.getDelta() );
      var time = 0.5 * app.clock.getElapsedTime();
      camera.position.x = 450 * Math.cos( time / 3 ) + 200;
      camera.position.y = 250 * Math.sin( time / 4 ) + 200;
      camera.lookAt( new THREE.Vector3( 25, 25, 0 ) );
      app.terrain.offset.x = camera.position.x;
      app.terrain.offset.y = camera.position.y;
      renderer.render( scene, camera );
    }
  };
  return app;
} );
