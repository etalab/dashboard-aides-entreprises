console.log("+ + + utils/mapbox... ")

import getDataFromUrl from "~/utils/getData.js"
import axios from "axios"

import {
  toMillionsOrElse,
  toFloat,
  switchFormatFunctions,
} from "~/utils/utils.js"

// - - - - - - - - - - - - - - - - - - - - - //
// - - - SOURCES - - - //
// - - - - - - - - - - - - - - - - - - - - - //

// TRANSFORM TO GEOJSON
export function transformDataset(source, dataset, geoCanvas) {
  // console.log("+ + + transformDataset ... source : ", source)
  // console.log("+ + + transformDataset ... dataset : ", dataset)
  // console.log("+ + + transformDataset ... geoCanvas : ", geoCanvas)
  let transformedData = {
    type: "FeatureCollection",
    features: [],
  }
  let transformTo = source.transformTo
  let canvasKey = transformTo.canvasKey

  let features = []

  dataset.data.forEach((item) => {
    let key =
      canvasKey.canvasKeyPrefix +
      item[transformTo.srcKey] +
      canvasKey.canvasKeySuffix
    // console.log("+ + + transformDataset ... key : ", key)
    let itemPoint = canvasKey.keyIsFieldName
      ? geoCanvas[`${key}`]
      : geoCanvas.find((g) => g[canvasKey.field] == key)
    if (itemPoint) {
      let properties = buildProperties(transformTo.properties, item)
      let geoObject = {
        type: "Feature",
        properties: properties,
        geometry: {
          type: transformTo.geometry.type,
          coordinates: itemPoint,
        },
      }
      features.push(geoObject)
    }
  })

  transformedData.features = features

  // transformedData.features = dataset.data.map( item => {

  //   let itemPoint = canvasKey.keyIsFieldName ? geoCanvas[ `${key}` ] : geoCanvas.find( g => g[ canvasKey.field ] == key )
  //   console.log("+ + + transformDataset ... itemPoint : ", itemPoint)

  //   if ( itemPoint ) {
  //     // build properties
  //     let properties = buildProperties(transformTo.properties, item)
  //     console.log("+ + + transformDataset ... properties : ", properties)
  //     // build feature
  //     return {
  //       type: 'Feature',
  //       properties: properties,
  //       geometry: {
  //         type: transformTo.geometry.type,
  //         coordinates: itemPoint
  //       }
  //     }
  //   }

  //   else {
  //     return null; // skip
  //   }

  // })

  return transformedData
}

// GEOJSON PROPERTIES
export function buildProperties(propertiesArray, item) {
  let properties = {}
  propertiesArray.forEach((prop) => {
    // console.log("+ + + buildProperties ... prop : ", prop, '... '.repeat(5))
    let value = item[prop.itemField]
    if (prop.needFormatting) {
      value = switchFormatFunctions(value, prop.format)
    }
    properties[prop.propName] = value
  })
  return properties
}

// - - - - - - - - - - - - - - - - - - - - - //
// - - - LAYERS - - - //
// - - - - - - - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - - - - - - - //
// - - - LEGACY FROM PREVIOUS PROJECT  - - - //
// - - - - - - - - - - - - - - - - - - - - - //

// - - - SOURCES - - - //

// GEOJSON DATA
export function getStyleJSON(styleURL) {
  console.log("+ + + getStyleJSON ... styleURL : ", styleURL)

  let head = {
    headers: {
      // 'Access-Control-Allow-Origin': '*',
      // 'accept' : 'application/json',
      // 'credentials': false
    },
  }
  axios
    .get(styleURL, head)
    .then((response) => {
      console.log("+ + + getStyleJSON / AXIOS / response : ", response)
    })
    .catch((error) => {
      console.log("+ + + getStyleJSON / AXIOS / error : ", error)
    })
}

// GEOJSON SOURCE
export function createGeoJSONSource(geoJSON, vars) {
  console.log("+ + + createGeoJSONSource ... ")

  let geoJsonSource = {
    // id : 'clusterLayer',
    type: "geojson",
    data: geoJSON,
    cluster: vars.isCluster,
    clusterMaxZoom: vars.clusterMaxZoom,
    clusterRadius: vars.clusterRadius,
  }
  return geoJsonSource
}

// - - - LAYERS - - - //

// GEOJSON LAYERS - CLUSTER CIRCLES
export function createClusterCirclesLayer(
  sourceId,
  vars,
  layerId = "clusters"
) {
  let layerConfig = {
    id: layerId,
    type: "circle",
    source: sourceId,
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750

      "circle-stroke-width": vars.circle_stroke_width,
      "circle-stroke-color": vars.circle_stroke_color,

      // "circle-color": [
      //   "step",
      //   ["get", "point_count"],
      //   // "#51bbd6",
      //   // 100, "#f1f075",
      //   // 750,"#f28cb1"
      //   "#a174ac",
      //   100, "#90689a",
      //   250, "#805c89",
      //   500, "#705178",
      //   750, "#503a56",
      // ],
      "circle-color": [
        "step",
        ["get", "point_count"],
        vars.circle_color,
        100,
        vars.circle_color_100,
        250,
        vars.circle_color_250,
        500,
        vars.circle_color_500,
        750,
        vars.circle_color_750,
      ],

      // "circle-radius": [
      //   "step",
      //   ["get", "point_count"],
      //   20,
      //   100, 20,
      //   250, 30,
      //   500, 40,
      //   750, 50
      // ],
      "circle-radius": [
        "step",
        ["get", "point_count"],
        vars.circle_radius,
        100,
        vars.circle_radius_100,
        250,
        vars.circle_radius_250,
        500,
        vars.circle_radius_500,
        750,
        vars.circle_radius_750,
      ],
    },
    layout: {
      visibility: vars.is_default_visible ? "visible" : "none",
    },
  }
  return layerConfig
}

// GEOJSON LAYERS - CLUSTER COUNTS
export function createClusterCountLayer(
  sourceId,
  vars,
  layerId = "cluster-counts"
) {
  let layerConfig = {
    id: layerId,
    type: "symbol",
    source: sourceId,
    filter: ["has", "point_count"],
    layout: {
      visibility: vars.is_default_visible ? "visible" : "none",
      "text-field": "{point_count_abbreviated}",
      "text-font": ["Open Sans Bold"], // OK
      // "text-font": ["Open Sans Regular"], // OK
      // "text-font": ["Roboto Regular"], // not working
      "text-size": vars.text_size,
    },
    paint: {
      "text-color": vars.text_color,
    },
  }
  return layerConfig
}

// GEOJSON LAYERS - UNCLUSTERED CIRCLES
export function createClusterUnclusteredLayer(
  sourceId,
  vars,
  layerId = "unclustered-point"
) {
  let layerConfig = {
    id: layerId,
    type: "circle",
    source: sourceId,
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": vars.circle_color,
      "circle-radius": vars.circle_radius,
      "circle-stroke-color": vars.circle_stroke_color,
      "circle-stroke-width": vars.circle_stroke_width,
    },
    layout: {
      visibility: vars.is_default_visible ? "visible" : "none",
    },
  }
  return layerConfig
}

// GEOJSON LAYERS - ALL POINTS CIRCLES
export function createAllPoints(sourceId, vars, layerId = "all-points") {
  var layerConfig = {
    id: layerId,
    type: "circle",
    source: sourceId,
    filter: ["==", "$type", "Point"],
    paint: {
      "circle-stroke-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        9,
        0,
        vars.max_zoom,
        1,
      ],
      "circle-stroke-color": vars.circle_stroke_color,
      "circle-color": vars.circle_color,
      "circle-opacity": vars.circle_opacity,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        vars.min_zoom,
        vars.radius_min,
        vars.max_zoom,
        vars.radius_max,
      ],
    },
    layout: {
      visibility: vars.is_default_visible ? "visible" : "none",
    },
  }
  return layerConfig
}

// GEOJSON LAYERS - HEATMAP
export function createHeatmapLayer(sourceId, vars, layerId = "heatmap-layer") {
  // cf : https://docs.mapbox.com/help/tutorials/make-a-heatmap-with-mapbox-gl-js/
  let layerConfig = {
    id: layerId,
    type: "heatmap",
    source: sourceId,
    maxzoom: vars.max_zoom,
    paint: {
      // Increase the heatmap weight based on frequency and property magnitude
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", vars.prop_weight],
        0,
        0,
        0.1,
        1,
      ],

      // Increase the heatmap color weight weight by zoom level
      // heatmap-intensity is a multiplier on top of heatmap-weight
      "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        0.1,
        vars.max_zoom,
        1.5,
      ],

      // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
      // Begin color ramp at 0-stop with a 0-transparancy color
      // to create a blur-like effect.
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.2,
        "rgb(103,169,207)",
        0.4,
        "rgb(209,229,240)",
        0.6,
        "rgb(253,219,199)",
        0.8,
        "rgb(239,138,98)",
        1,
        "rgb(178,24,43)",
      ],

      // Adjust the heatmap radius by zoom level
      "heatmap-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        vars.radius_min,
        vars.radius_max,
        vars.max_zoom,
        100,
      ],

      // Transition from heatmap to circle layer by zoom level
      "heatmap-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        6,
        0.7,
        vars.max_zoom,
        0.1,
      ],
    },
    layout: {
      visibility: vars.is_default_visible ? "visible" : "none",
    },
  }
  return layerConfig
}

// GEOJSON LAYERS - CHOROPLETH
// cf : https://docs.mapbox.com/mapbox-gl-js/example/data-join/
// cf :
export function createChoroplethLayer(sourceId, vars, layerId = "choropleth") {
  let layerConfig = {
    id: layerId,
    type: "fill",
    source: sourceId,
    maxzoom: vars.max_zoom,
    minzoom: vars.min_zoom,
    // "source-layer": sourceId,
    paint: {
      // cf : https://docs.mapbox.com/mapbox-gl-js/style-spec/#layer-paint
      "fill-color": vars.fill_color,
      // 'fill-color': [
      //   'interpolate',
      //   ['linear'],
      //   ['get', vars.agregated_data_field ],
      //   0, vars.fill_color,
      //   1,  '#EED322',
      //   3,  '#E6B71E',
      //   5,  '#DA9C20',
      //   10, '#CA8323',
      //   20, '#B86B25',
      //   30, '#A25626',
      //   40, '#8B4225',
      //   50, '#723122'
      // ],
      "fill-opacity": vars.fill_opacity, // 0.5,
      "fill-outline-color": vars.fill_outline_color, // "rgb(256,256,256)",
    },
    layout: {
      visibility: vars.is_default_visible ? "visible" : "none",
    },
  }

  return layerConfig
}

// mapbox actions
