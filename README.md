LOD Terrain
===========

LOD Terrain is an example of how to render a terrain with a variable level of detail (LOD), based on the distance from the camera. The approach taken is based on [CD-LOD](http://www.vertexasylum.com/downloads/cdlod/cdlod_latest.pdf). 

* [Accompanying blog post](http://www.pheelicks.com/2014/03/rendering-large-terrains/)
* [Slides](http://felixpalmer.github.io/lod-terrain/presentation)

[Try out the live demo here](http://felixpalmer.github.io/lod-terrain)
![](https://github.com/felixpalmer/lod-terrain/raw/master/screenshots/screenshot1.png)
![](https://github.com/felixpalmer/lod-terrain/raw/master/screenshots/screenshot4.png)
![](https://github.com/felixpalmer/lod-terrain/raw/master/screenshots/screenshot5.png)

Height calculations
===================

Currently the detail distribution isn't as per the paper, namely it assumes the most detailed region is the point above which the camera currently resides, rather than taking into account the height of the terrain.

Running
=======

Just host this directory with a webserver of your choice. You can also use the `webserver.sh` script included (provided you have Python) to set up a simple development server.

Then visit http://localhost:8000 in your browser. Or try the [online demo](http://felixpalmer.github.io/lod-terrain).

Structure
=========

This project is based on [amd-three.js](https://github.com/felixpalmer/amd-three.js/). Please see there for details of project structure.
