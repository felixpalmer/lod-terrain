define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, geometry, light, material, renderer, scene ) {
  var app = {
    init: function () {

      var tileSize = 32;
      var worldWidth = 1024;
      var n = worldWidth / tileSize;

      var createTile = function ( x, y, scale ) {
        var plane = new THREE.Mesh( geometry.plane, material.terrain() );
        plane.material.uniforms.uOffset.value.x = x;
        plane.material.uniforms.uOffset.value.y = y;
        plane.material.uniforms.uScale.value = scale;
        scene.add( plane );
      };

      createTile( 0, 0, 1 );
      for ( var scale = 1; scale < worldWidth; scale *= 2 ) {
        createTile( 0, scale, scale );
        createTile( scale, scale, scale );
        createTile( scale, 0, scale );
      }
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();
      renderer.render( scene, camera );
    }
  };
  return app;
} );
