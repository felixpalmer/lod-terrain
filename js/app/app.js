define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, geometry, light, material, renderer, scene ) {
  var app = {
    meshes: [],
    init: function () {
      var spacing = 300;
      var offset = 0;
      for ( var m in material ) {
        // Create one cube for each material, and add to scene
        var mesh = new THREE.Mesh( geometry.cube, material[m] );
        mesh.position.x = offset;
        offset += spacing;
        light.target = mesh;
        scene.add( mesh );
        app.meshes.push( mesh );
      }
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();

      // Rotate all meshes we've added to scene
      for ( var m in app.meshes ) {
        var mesh = app.meshes[m];
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
      }

      renderer.render( scene, camera );
    }
  };
  return app;
} );
