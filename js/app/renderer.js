define( ["three", "container"], function ( THREE, container ) {
  container.innerHTML = "";
  var renderer = new THREE.WebGLRenderer( { clearColor: 0x000000 } );
  renderer.sortObjects = false;
  renderer.autoClear = false;
  container.appendChild( renderer.domElement );

  var updateSize = function () {
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    
    // For a smoother render double the pixel ratio
    renderer.setPixelRatio( 2 );
  };
  window.addEventListener( 'resize', updateSize, false );
  updateSize();

  return renderer;
} );
