export const style = {
  version: 8,
  sources: {
    osm2vectortiles: {
      type: "vector",
      url: "https://osm2vectortiles.tileserver.com/v2.json",
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#41afa5",
      },
    },
    {
      id: "water",
      type: "fill",
      source: "osm2vectortiles",
      "source-layer": "water",
      filter: ["==", "$type", "Polygon"],
      paint: {
        "fill-color": "#3887be",
      },
    },
    // {
    //   "id": "road",
    //   "type": "fill",
    //   "source": "osm2vectortiles",
    //   "source-layer": "road",
    //   "filter": ["==", "$type", "Polygon"],
    //   "paint": {
    //     "fill-color": "#41cff5"
    //   }
    // },
  ],
}
