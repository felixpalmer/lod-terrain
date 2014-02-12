define( ["three", "geometry", "material"], function ( THREE, geometry, material ) {
  // Tiles that sit next to a tile of a greater scale need to have their edges morphed to avoid
  // edges. Mark which edges need morphing using flags. These flags are then read by the vertex
  // shader which performs the actual morph
  var Edge = {
    NONE: 0,
    TOP: 1,
    LEFT: 2,
    BOTTOM: 4,
    RIGHT: 8
  };

  // Terrain is an extension of Object3D and thus can be added directly to the stage
  var Terrain = function( worldWidth ) {
    THREE.Object3D.call( this );

    this.offset = new THREE.Vector3( 0, 0, 0 );

    // Create "quadtree" of tiles, with smallest in center
    // Each added layer consists of the following tiles (marked 'A'), with the tiles
    // in the middle being created in previous layers
    // +---+---+---+---+
    // | A | A | A | A |
    // +---+---+---+---+
    // | A |   |   | A |
    // +---+---+---+---+
    // | A |   |   | A |
    // +---+---+---+---+
    // | A | A | A | A |
    // +---+---+---+---+
    this.createTile( 0, 0, 1, Edge.NONE );
    /*jslint bitwise: true */
    for ( var scale = 16; scale < worldWidth; scale *= 2 ) {
      this.createTile( -2 * scale, -2 * scale, scale, Edge.BOTTOM | Edge.LEFT );
      this.createTile( -2 * scale, -scale, scale, Edge.LEFT );
      this.createTile( -2 * scale, 0, scale, Edge.LEFT );
      this.createTile( -2 * scale, scale, scale, Edge.TOP | Edge.LEFT );

      this.createTile( -scale, -2 * scale, scale, Edge.BOTTOM );
      // 2 tiles 'missing' here are in previous layer
      this.createTile( -scale, scale, scale, Edge.TOP );

      this.createTile( 0, -2 * scale, scale, Edge.BOTTOM );
      // 2 tiles 'missing' here are in previous layer
      this.createTile( 0, scale, scale, Edge.TOP );

      this.createTile( scale, -2 * scale, scale, Edge.BOTTOM | Edge.RIGHT );
      this.createTile( scale, -scale, scale, Edge.RIGHT );
      this.createTile( scale, 0, scale, Edge.RIGHT );
      this.createTile( scale, scale, scale, Edge.TOP | Edge.RIGHT );
    }
    /*jslint bitwise: false */
  };

  Terrain.prototype = Object.create( THREE.Object3D.prototype );

  Terrain.prototype.createTile = function ( x, y, scale, edgeMorph ) {
    var plane = new THREE.Mesh( geometry.plane, material.terrain() );
    plane.material.uniforms.uOffset.value.x = x;
    plane.material.uniforms.uOffset.value.y = y;
    plane.material.uniforms.uGlobalOffset.value = this.offset;
    plane.material.uniforms.uScale.value = scale;
    plane.material.uniforms.uEdgeMorph.value = edgeMorph;
    this.add( plane );
  };

  return Terrain;
} );
