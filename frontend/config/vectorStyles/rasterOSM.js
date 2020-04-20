export const style = {
  version: 8,
  sources: {
    "simple-tiles": {
      type: "raster",
      // point to our third-party tiles. Note that some examples
      // show a "url" property. This only applies to tilesets with
      // corresponding TileJSON (such as mapbox tiles).
      tiles: [
        "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "simple-tiles",
      type: "raster",
      source: "simple-tiles",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
}
