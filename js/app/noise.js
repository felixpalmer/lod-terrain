define( ["three"], function ( THREE ) {
  // Create noise and save it to texture
  var width = 2048;
  var size = width * width;
  var data = new Uint8Array( size );
  for ( var i = 0; i < size; i ++ ) {
    data[i] = i % 256;
  }

  var noise = new THREE.DataTexture( data, width, width, THREE.AlphaFormat );
  noise.wrapS = THREE.RepeatWrapping;
  noise.wrapT = THREE.RepeatWrapping;
  noise.needsUpdate = true;
  return noise;
} );
