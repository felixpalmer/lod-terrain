define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, geometry, light, material, renderer, scene ) {
  var app = {
    init: function () {

      var tileSize = 32;
      var worldWidth = 1024;
      var n = worldWidth / tileSize;
      for ( var i = 0; i < n; i++ ) {
        for ( var j = 0; j < n; j++ ) {
          var plane = new THREE.Mesh( geometry.plane, material.terrain() );
          plane.material.uniforms.uOffset.value.x = tileSize * i;
          plane.material.uniforms.uOffset.value.y = tileSize * j;
          plane.material.uniforms.uScale.value = tileSize;
          scene.add( plane );
        }
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
