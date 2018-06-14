define( ["three", "ImprovedNoise"], function ( THREE, ImprovedNoise ) {
  // Create noise and save it to texture
  var width = 1024;
  var size = width * width;
  var data = new Uint8Array( size );

  // Zero out height data
  for ( var i = 0; i < size; i ++ ) {
    data[i] = 0;
  }

  var perlin = new ImprovedNoise();
  var quality = 1;
  var z = Math.random() * 100;

  // Do several passes to get more detail
  for ( var iteration = 0; iteration < 4; iteration++ ) {
    for ( var i = 0; i < size; i ++ ) {
      var x = i % width;
      var y = Math.floor( i / width );
      data[i] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality );
    }
    quality *= 5;
  }

  var noise = new THREE.DataTexture( data, width, width, THREE.AlphaFormat );
  noise.wrapS = THREE.MirroredRepeatWrapping;
  noise.wrapT = THREE.MirroredRepeatWrapping;
  noise.magFilter = THREE.LinearFilter;
  noise.minFilter = THREE.LinearMipMapLinearFilter;
  noise.generateMipmaps = true;
  noise.needsUpdate = true;
  return noise;
} );
