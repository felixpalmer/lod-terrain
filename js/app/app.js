define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, geometry, light, material, renderer, scene ) {
  var app = {
    init: function () {
      var plane = new THREE.Mesh( geometry.plane, material.terrain );
      scene.add( plane );
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();
      renderer.render( scene, camera );
    }
  };
  return app;
} );
