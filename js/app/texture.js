define( ["three"], function ( THREE ) {
  var texturePath = "js/textures/";
  return {
    grass: THREE.ImageUtils.loadTexture( texturePath + "grass.png" )
  };
} );
