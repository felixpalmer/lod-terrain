define( ["three"], function ( THREE ) {
  var texturePath = "js/textures/";
  var sky = THREE.ImageUtils.loadTexture( texturePath + "sky.png" );

  var textures = {
    sky: sky,
    grass: THREE.ImageUtils.loadTexture( texturePath + "grass.jpg" ),
    rock: THREE.ImageUtils.loadTexture( texturePath + "rock.jpg" ),
    snow: THREE.ImageUtils.loadTexture( texturePath + "snow.jpg" )
  };

  for ( var t in textures ) {
    if ( textures.hasOwnProperty( t ) ) {
      textures[t].wrapS = textures[t].wrapT = THREE.RepeatWrapping;
    }
  }
  sky.wrapS = sky.wrapT = THREE.MirroredRepeatWrapping;
  sky.repeat.set( 2, 2 );

  return textures;
} );
