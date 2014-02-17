define( ["three"], function ( THREE ) {
  var texturePath = "js/textures/";
  var sky = THREE.ImageUtils.loadTexture( texturePath + "sky.png" );
  sky.wrapS = sky.wrapT = THREE.MirroredRepeatWrapping;
  sky.repeat.set( 2, 2 );

  var textures = {
    sky: sky
  };

  return textures;
} );
