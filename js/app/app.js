define( ["three", "camera", "container", "controls", "geometry", "material", "noise", "renderer", "scene", "terrain"],
function ( THREE, camera, container, controls, geometry, material, noise, renderer, scene, Terrain ) {
  var app = {
    clock: new THREE.Clock(),
    mouse: { x: 0, y: 0 },
    init: function () {
      // Terrain( heightdata, worldWidth, levels of detail, tile resolution )
      app.terrain = new Terrain( noise, 1024, 4, 64 );
      scene.add( app.terrain );

      // Add sky
      var sky = new THREE.Mesh( geometry.sky, material.sky );
      sky.position.z = 150;
      //scene.add( sky );
      
      /// Add sky2
      var sky2 = new THREE.Mesh( geometry.sky2, material.atmosphere );
      sky2.position.z = -1000;
      scene.add( sky2 );

      // Mouse input
      container.addEventListener( 'mousemove', function( e ) {
        app.mouse = {
          x: e.clientX - container.offsetWidth / 2,
          y: container.offsetHeight - e.clientY
        };
      } );
    },
    height: function() {
      return Math.min( app.mouse.y / 2 + 20, 500 );
 //     var i = Math.floor( camera.position.x % 1024 );
 //     var j = 1023 - Math.floor( camera.position.y % 1024 );
 //     //var h = 1024 * noise.image.data[ 13 ];
 //     var h = 1024 * noise.image.data[i + 1024 * j] / 255;
 //     return h * h / 2000 + 20;
    },
    center: new THREE.Vector3( 25, 25, 0 ),
    animate: function () {
      window.requestAnimationFrame( app.animate );
      //controls.update( app.clock.getDelta() );
      var time = 0.5 * app.clock.getElapsedTime();
      camera.position.x = 450 * Math.cos( time / 3 ) + 200;
      camera.position.y = 250 * Math.sin( time / 4 ) + 200;
      camera.position.z += 0.02 * ( app.height() - camera.position.z );
      //camera.position.z = 30 + 260 * Math.pow( Math.sin( time ), 4 );
      camera.lookAt( app.center );
      app.terrain.offset.x = camera.position.x;
      app.terrain.offset.y = camera.position.y;
      renderer.render( scene, camera );
    }
  };
  return app;
} );
