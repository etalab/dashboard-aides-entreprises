
import { style as EtalabStyle } from './vectorStyles/Etalab.js'
import { style as RasterVoyagerStyle }  from './vectorStyles/rasterVoyager.js'

console.log( '--- RasterVoyagerStyle : ', RasterVoyagerStyle )
console.log( '--- JSON.stringify(RasterVoyagerStyle) : ', JSON.stringify(RasterVoyagerStyle) )

console.log( '--- JSON.stringify(EtalabStyle) : ', JSON.stringify(EtalabStyle) )

export const StylesOSM = {

  EtalabUrl : "https://etalab-tiles.fr/styles/osm-bright/style.json",
  EtalabFile : JSON.stringify(EtalabStyle),

  RasterVoyager : JSON.stringify(RasterVoyagerStyle),

  OSMBright: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',

  Positron: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
  DarkMatter: 'https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json',
  KlokantechBasic: 'https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json',

  // cf : https://leaflet-extras.github.io/leaflet-providers/preview/
  testRasterVoyager : {
    "version": 8,

    // cf : http://jsfiddle.net/brianssheldon/wm18a33d/27/
    // cf : http://glfonts.lukasmartinelli.ch
    // cf : https://github.com/openmaptiles/fonts
    "glyphs": "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
    "sources": {
      "simple-tiles": {
        "type": "raster",
        // point to our third-party tiles. Note that some examples
        // show a "url" property. This only applies to tilesets with
        // corresponding TileJSON (such as mapbox tiles). 
        "tiles": [
          "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          "https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        ],
        "attribution": '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        "tileSize": 256
      }
    },
    "layers": [{
      "id": "simple-tiles",
      "type": "raster",
      "source": "simple-tiles",
      "minzoom": 2,
      "maxzoom": 19
    }]
  },

}


