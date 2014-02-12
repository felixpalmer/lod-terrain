define( ["three", "geometry", "material"], function ( THREE, geometry, material ) {
  // Terrain is an extension of Object3D and thus can be added directly to the stage
  var Terrain = function( worldWidth ) {
    THREE.Object3D.call( this );

    // Create "quadtree" of tiles, with smallest in center
    this.createTile( 0, 0, 1 );
    for ( var scale = 16; scale < worldWidth; scale *= 2 ) {
      this.createTile( -2 * scale, -2 * scale, scale );
      this.createTile( -2 * scale, -scale, scale );
      this.createTile( -2 * scale, 0, scale );
      this.createTile( -2 * scale, scale, scale );

      this.createTile( -scale, -2 * scale, scale );
      // 2 tiles 'missing' here are in previous layer
      this.createTile( -scale, scale, scale );

      this.createTile( 0, -2 * scale, scale );
      // 2 tiles 'missing' here are in previous layer
      this.createTile( 0, scale, scale );

      this.createTile( scale, -2 * scale, scale );
      this.createTile( scale, -scale, scale );
      this.createTile( scale, 0, scale );
      this.createTile( scale, scale, scale );
    }
  };

  Terrain.prototype = Object.create( THREE.Object3D.prototype );

  Terrain.prototype.createTile = function ( x, y, scale ) {
    var plane = new THREE.Mesh( geometry.plane, material.terrain() );
    plane.material.uniforms.uOffset.value.x = x;
    plane.material.uniforms.uOffset.value.y = y;
    plane.material.uniforms.uGlobalOffset.value = this.position;
    plane.material.uniforms.uScale.value = scale;
    this.add( plane );
  };

  return Terrain;
} );
