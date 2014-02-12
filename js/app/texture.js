define( ["three"], function ( THREE ) {
  var texturePath = "js/textures/";
  var sky = THREE.ImageUtils.loadTexture( texturePath + "sky.png" );
  sky.wrapS = sky.wrapT = THREE.MirrorRepeatWrapping;

  var textures = {
    sky: sky
  };

  return textures;
} );
