<style src="mapbox-gl/dist/mapbox-gl.css"></style>
<style lang="scss" scoped>
.spot__map {
  margin: 0;
  width: auto;
  .mgl-map-wrapper {
    position: absolute;
  }
}
</style>

<template>
  <div
    v-show="canShow"
    :id="`map-${settings.id}`"
    :class="`map`"
    :trigger="`${trigger}`"
    :triggerVis="`${triggerVis}`"
    :style="`height:${mapHeight}px!important;max-height:${mapHeight}px`"
  >
    <!-- :style="`height:${contentWindowHeight}px!important;max-height:${contentWindowHeight}px`" -->
    <!-- LOADER'S CSS -->
    <style type="text/css">
      .lds-roller div:after {
      content: " ";
      display: block;
      position: absolute;
      width: {{ mapUI.loader.width }};
      height: {{ mapUI.loader.height }};
      border-radius: 50%;
      background:  {{ mapUI.loader.color }};
      margin: -3px 0 0 -3px;
      }
      .floating {
      position: absolute;
      z-index: 200;
      top: 50%;
      left: {{ isMobileWidth ? '35%' : '45%' }};
      }
    </style>

    <!-- LOADER -->
    <div v-show="showLoader" id="loader-map" class="lds-roller floating">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>

    <!-- LAYERS & LEGEND -->
    <v-layout
      v-if="map"
      id="legend"
      :class="`legend-block legend-bottom-right`"
    >
      <!-- DEBUGGING -->
      <span v-if="log">v1.9 - fix apex sizes</span>
      <!-- <b>{{ currentZoom }}</b> -->
      <!-- this.$device.isMobileOrTablet : <b>{{ $device.isMobileOrTablet }}</b> -->

      <!-- LAYERS SWITCH -->
      <div
        v-if="mapsVisibility && mapsVisibility.is_activated"
        class="legend layer-switch justify-center"
      >
        <v-btn
          class="justify-center"
          outlined
          block
          @click="switchMapsDrawer()"
        >
          {{ mapsVisibility.title[locale] }}
        </v-btn>

        <div v-show="drawerMapsOpen" class="legend-content justify-left">
          <div
            v-for="(mapRef, index) in mapsVisibility.map_switches"
            :key="index"
            class="field"
          >
            <input
              :id="mapRef.id"
              class="is-checkradio"
              :name="mapRef.id"
              :checked="mapRef.default_visible ? 'checked' : false"
              type="checkbox"
              @click="switchMapVisibility(mapRef.id)"
            >
            <label :for="mapRef.id">
              {{ mapRef.label[locale] }}
            </label>
          </div>
        </div>
      </div>
    </v-layout>

    <!-- MAP WITH MAPBOX GL -->
    <no-ssr>
      <MglMap
        ref="mapboxDiv"
        access-token=""
        :map-style.sync="mapOptions.mapStyle"
        :center="mapOptions.center"
        :zoom="mapOptions.zoom"
        :max-zoom="mapOptions.maxZoom"
        :min-zoom="mapOptions.minZoom"
        @load="onMapLoaded"
      >
        <!-- CONTROLS -->
        <MglNavigationControl position="bottom-right" />
      </MglMap>

      <!-- <mapbox
        accessToken=""
        :map-options="{
          style: 'https://etalab-tiles.fr/styles/osm-bright/style.json' ,
          center: mapOptions.center,
          zoom : mapOptions.zoom
        }"
        @map-load="loaded"
      /> -->
    </no-ssr>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

import { Mapbox, mapboxgl } from "mapbox-gl"
import { MglMap } from "vue-mapbox"

let _map

import bbox from "@turf/bbox"

import axios from "axios"
import { getDataFromUrl } from "~/utils/getData.js"
import { transformDataset, buildProperties } from "~/utils/mapbox.js"

import { objectFromPath, switchFormatFunctions } from "~/utils/utils.js"

import { StylesOSM } from "~/config/mapboxVectorStyles.js"

export default {
  name: "MapboxGL",

  components: {},

  props: ["settings", "routeId"],

  data() {
    return {
      dataViewType: "maps",
      viewConfig: undefined,
      canShow: undefined,
      mapHeight: undefined,

      showLoader: true,

      // MAPBOX MAP OBJECT
      map: undefined,
      originalCenter: undefined,
      originalZoom: undefined,
      currentZoom: undefined,

      mapOptions: {
        mapStyle: undefined,
        zoom: undefined,
        maxZoom: undefined,
        minZoom: undefined,
        currentZoom: undefined,
        center: undefined,
        currentCenter: undefined,
      },

      mapsVisibility: undefined,
      drawerMapsOpen: undefined,

      // LAYERS & SOURCES
      sources: undefined,

      maps: undefined,
      layers: undefined,

      // UX
      hoveredStateId: {},
      selectedStateId: {},
    }
  },

  watch: {
    triggerVis(next, prev) {
      this.getCanShow()
      this.handleResize()
    },

    triggerBtn(next, prev) {
      this.handleResize()
    },

    map(next, prev) {
      this.handleResize()
      if (next && !prev) {
        this.log && console.log("C-MapboxGL / watch - map - is created ")
        let storeSourcesArray = this.sources.filter((s) => s.from === "store")
        let urlSourcesArray = this.sources.filter((s) => s.from === "url")
        this.loadStoreSources(storeSourcesArray)
        this.loadUrlSources(urlSourcesArray).then(() => {
          this.loadLayers(this.layers)
          this.loadClicEvents(this.maps)
          this.showLoader = false
        })
      }
    },

    getResetZoomTrigger(next, prev) {
      // this.log && console.log('C-MapboxGL / watch - getResetZoomTrigger / next :', next)
      this.handleResize()
      this.resetZoom()
    },
  },

  created() {
    this.log && console.log("C-MapboxGL / created ...")
    window.addEventListener("resize", this.handleResize)
  },

  destroyed() {
    window.removeEventListener("resize", this.handleResize)
  },

  beforeMount() {
    this.log &&
      console.log("\n- + - MapboxGL component - + - + - + - + - + - + ")
    this.log && console.log("C-MapboxGL / beforeMount ... ")

    // set up view config
    this.viewConfig = this.getLocalConfig
    // this.log && console.log("C-MapboxGL / dataset / this.viewConfig : ", this.viewConfig)
    this.handleResize()

    // set div visibility in store
    this.$store.commit("setDivVisibility", this.settings)

    // set up MAPBOX options
    const mapOptionsRoute = this.viewConfig.map_options
    // this.log && console.log("C-MapboxGL / dataset / mapOptionsRoute : ", mapOptionsRoute)

    let mapOptions = {
      // mapStyle      : StylesOSM[ 'testRasterVoyager' ], // EtalabFile | testRasterVoyager | RasterVoyager
      // mapStyle      : StylesOSM[ 'EtalabRaw' ], // EtalabFile | testRasterVoyager | RasterVoyager
      // mapStyle      : StylesOSM[ 'RasterVoyager' ], // EtalabFile | testRasterVoyager | RasterVoyager
      // mapStyle      : StylesOSM[ 'EtalabUrl' ], // EtalabFile | testRasterVoyager | RasterVoyager
      mapStyle: StylesOSM[mapOptionsRoute.mapStyle], // EtalabFile | testRasterVoyager | RasterVoyager

      zoom: mapOptionsRoute.zoom,
      maxZoom: mapOptionsRoute.maxZoom,
      minZoom: mapOptionsRoute.minZoom,
      // currentZoom: mapOptionsRoute.currentZoom,
      center: [mapOptionsRoute.center[1], mapOptionsRoute.center[0]],
      currentCenter: mapOptionsRoute.currentCenter,
    }
    this.mapOptions = mapOptions

    // setup sources
    this.sources = this.viewConfig.sources
    this.originalCenter = [mapOptionsRoute.center[1], mapOptionsRoute.center[0]]
    this.originalZoom = mapOptionsRoute.zoom
    this.currentZoom = mapOptionsRoute.zoom

    // setup maps
    this.maps = this.viewConfig.maps

    // setup layers
    this.layers = this.viewConfig.layers

    // setup drawers
    this.mapsVisibility = this.viewConfig.maps_visibility
    this.drawerMapsOpen =
      this.mapsVisibility && this.mapsVisibility.is_drawer_open
  },

  mounted() {
    this.log && console.log("C-MapboxGL / mounted ...")
    this.handleResize()
    this.getCanShow()
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      mapUI: (state) => state.configUI.map,
      trigger: (state) => state.data.triggerChange,
      triggerVis: (state) => state.triggerVisChange,
      triggerBtn: (state) => state.buttons.triggerBtnChange,
      mobileBreakpoints: (state) => state.configUX.mobileBreakpoints,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      getDataViewConfig: "getDataViewConfig",
      getFromInitData: "data/getFromInitData",
      getFromDisplayedData: "data/getFromDisplayedData",
      getStoreSourceData: "data/getStoreSourceData",
      windowSize: "getWindowsSize",
      getCurrentNavbarFooter: "getCurrentNavbarFooter",
      // getCurrentBreakpoint: "getCurrentBreakpoint",
      getResetZoomTrigger: "maps/getResetZoomTrigger",
      getDivCurrentVisibility: "getDivCurrentVisibility",
    }),

    // config
    getLocalConfig() {
      let viewId = {
        dataViewType: this.dataViewType,
        id: this.settings.id,
      }
      let localConfig = this.getDataViewConfig(viewId)
      return localConfig
    },

    contentWindowHeight() {
      let height = this.windowSize.height - this.navbarHeight
      if (
        this.getCurrentNavbarFooter &&
        this.getCurrentNavbarFooter.activated
      ) {
        height = height - this.getCurrentNavbarFooter.height
      }
      return height
    },

    isMobileWidth() {
      let breakpoints = this.mobileBreakpoints
      let currentBreakpoint = this.$vuetify.breakpoint.name
      return breakpoints.includes(currentBreakpoint)
    },

  },

  methods: {
    ...mapActions({
      setNestedData: "data/setNestedData",
    }),

    getCanShow() {
      let breakpoint = this.$vuetify.breakpoint.name
      let isVisible = this.getDivCurrentVisibility({
        div: { id: this.settings.id, routeId: this.routeId },
        breakpoint: breakpoint,
      })
      // this.log && console.log("C-MapboxGL / canShow ... isVisible : ", isVisible )
      this.canShow = isVisible
    },

    handleResize() {
      let winHeight = window.innerHeight
      // this.log && console.log("C-MapboxGL / handleResize ... winHeight : ", winHeight )

      let mapHeight = winHeight
      // let navbarHeight = this.navbarHeight
      // let getCurrentNavbarFooter = this.getCurrentNavbarFooter

      var docNavbars = document.querySelectorAll(`.odm-navbar`)
      this.log && console.log("C-MapboxGL / handleResize ... docNavbars : ", docNavbars )
      let docNavbarsArray = Array.prototype.slice.call(docNavbars)
      let sumNavbarsHeights = docNavbarsArray
        .map((i) => i.offsetHeight)
        .reduce((prev, curr) => prev + curr, 0)
      this.log && console.log("C-MapboxGL / handleResize ... sumNavbarsHeights : ", sumNavbarsHeights )

      if (this.isMobileWidth) {
        var docComponents = document.querySelectorAll(
          `.odm-colrow:not(.odm-colrow-map)`
        )
        // this.log && console.log("C-MapboxGL / handleResize ... docComponents : ", docComponents )
        let docComponentsArray = Array.prototype.slice.call(docComponents)
        let sumComponentsHeights = docComponentsArray
          .map((i) => i.offsetHeight)
          .reduce((prev, curr) => prev + curr, 0)
        // this.log && console.log("C-MapboxGL / handleResize ... sumComponentsHeights : ", sumComponentsHeights )

        mapHeight = winHeight - sumNavbarsHeights - sumComponentsHeights //- navbarsHeights
      } else {
        mapHeight = winHeight - sumNavbarsHeights
      }
      // this.log && console.log("C-MapboxGL / handleResize ... mapHeight : ", mapHeight )
      this.mapHeight = mapHeight



      // little hack to redraw window on safari IOS
      // let isMobileOrTablet = this.$device.isMobileOrTablet
      // // let isMobileOrTablet = true
      // if (isMobileOrTablet){
      //   this.log && console.log("C-MapboxGL / handleResize ... this.$device : ", this.$device )
      //   const int = setInterval(() => {
      //     window.scrollTo(0, 0)
      //   }, 100)
      // }

    },

    getCurrentZoom() {
      // let mapbox = this.map
      let mapbox = _map

      let currentZoom = mapbox.getZoom()
      // this.log && console.log("C-MapboxGL / getCurrentZoom ... currentZoom : ", currentZoom )
      this.currentZoom = currentZoom
      return currentZoom
    },

    // INITIIALIZATION - - - - - - - - - - - - - - - - - - //

    onMapLoaded(event) {
      this.log && console.log("C-MapboxGL / onMapLoaded ... ")

      // store in component
      // this.map = event.map
      this.map = true
      _map = event.map

      // in store => WARNING : object too complex to be stored/mutated in vuex so far
      // check : https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
    },

    isInZoomRange(zoomRange) {
      // this.log && console.log("C-MapboxGL / isInZoomRange ... zoomRange : ", zoomRange )

      let currentZoom = this.getCurrentZoom()
      // this.log && console.log("C-MapboxGL / isInZoomRange ... currentZoom : ", currentZoom )

      let isInZoomRangeBoolean = true
      if (zoomRange) {
        let maxZoom = zoomRange.maxZoom ? zoomRange.maxZoom : 18
        let minZoom = zoomRange.minZoom ? zoomRange.minZoom : 0

        if (currentZoom >= maxZoom || currentZoom <= minZoom) {
          isInZoomRangeBoolean = false
        }
      }
      // this.log && console.log("C-MapboxGL / isInZoomRange ... isInZoomRangeBoolean : ", isInZoomRangeBoolean )
      return isInZoomRangeBoolean
    },

    // LOADERS - - - - - - - - - - - - - - - - - - //

    loadStoreSources(sourcesArray) {
      // this.log &&
      //   console.log("\nC-MapboxGL / loadStoreSources ", "... ".repeat(10))

      // let mapbox = this.map
      let mapbox = _map
      let store = this.$store

      let promisesArray = []

      // STORE SOURCES (loaded as initData @ middleware GetInitData.js )
      for (let source of sourcesArray) {
        // this.log &&
        //   console.log(
        //     "\nC-MapboxGL / loadStoreSources - store ... source.id : ",
        //     source.id
        //   )
        // this.log &&
        //   console.log(
        //     "C-MapboxGL / loadStoreSources - store ... source.help : ",
        //     source.help
        //   )
        let mapBoxSrcObj = {
          type: source.type,
        }

        // retrieve source from store 'state.data.initData'
        let dataset = store.getters["data/getFromInitData"](source.fromId)
        // this.log && console.log("C-MapboxGL / loadStoreSources - store ... dataset : ", dataset)

        // let resp = new Promise( (resolve, reject ) => {
        //   let data = store.getters['data/getFromInitData']( source.fromId )
        //   resolve( data )
        // })
        // .then( dataset => {
        //   // transform to source.type if necessary
        //   if ( source.needTransform ) {
        //     let geoCanvas = store.getters['data/getFromInitData']( source.transformTo.geoCanvasId )
        //     // this.log && console.log("C-MapboxGL / loadStoreSources - store ... geoCanvas : ", geoCanvas)
        //     let geoCanvasData = geoCanvas.data
        //     dataset = transformDataset( source, dataset, geoCanvasData )
        //   }

        //   // this.log && console.log("C-MapboxGL / loadStoreSources - store ... dataset : ", dataset)

        //   // add source to map
        //   // this.log && console.log("C-MapboxGL / loadStoreSources - store ... addSource ...")
        //   mapBoxSrcObj.data = {...dataset}
        //   if (source.generateId) mapBoxSrcObj.generateId = source.generateId
        //   mapbox.addSource( source.id, mapBoxSrcObj )

        //   // add source to store
        //   store.dispatch('data/setDisplayedDataset', {
        //     id : source.id,
        //     data : dataset,
        //   })
        // })

        // transform to source.type if necessary
        if (source.needTransform) {
          let geoCanvas = store.getters["data/getFromInitData"](
            source.transformTo.geoCanvasId
          )
          // this.log && console.log("C-MapboxGL / loadStoreSources - store ... geoCanvas : ", geoCanvas)
          let geoCanvasData = geoCanvas.data
          dataset = transformDataset(source, dataset, geoCanvasData)
        }

        // this.log && console.log("C-MapboxGL / loadStoreSources - store ... dataset : ", dataset)

        // add source to map
        // this.log && console.log("C-MapboxGL / loadStoreSources - store ... addSource ...")
        mapBoxSrcObj.data = { ...dataset }
        if (source.generateId) mapBoxSrcObj.generateId = source.generateId
        mapbox.addSource(source.id, mapBoxSrcObj)

        // add source to store
        store.dispatch("data/setDisplayedDataset", {
          id: source.id,
          data: dataset,
        })

        // promisesArray.push(resp)
      }
      // return Promise.all( promisesArray )
    },

    loadUrlSources(sourcesArray) {
      this.log &&
        console.log("\nC-MapboxGL / loadUrlSources ", "... ".repeat(10))
      // let mapbox = this.map
      let mapbox = _map
      let store = this.$store

      // URL SOURCES
      let promisesArray = []
      for (let source of sourcesArray) {
        this.log &&
          console.log(
            "\nC-MapboxGL / loadUrlSources - url ... source.id : ",
            source.id
          )
        this.log &&
          console.log(
            "C-MapboxGL / loadUrlSources - url ... source.help : ",
            source.help
          )
        let mapBoxSrcObj = {
          type: source.type,
        }

        if (source.loadInStore) {
          let resp = axios.get(source.url)
          resp.then((r) => {
            let dataset = r.data
            // this.log && console.log("C-MapboxGL / loadUrlSources - url ... dataset : ", dataset)

            // add source to map
            // this.log && console.log("C-MapboxGL / loadUrlSources - url ... addSource ...")
            mapBoxSrcObj.data = { ...dataset }
            if (source.generateId) mapBoxSrcObj.generateId = source.generateId
            mapbox.addSource(source.id, mapBoxSrcObj)

            // add source to store - displayedData
            store.dispatch("data/setDisplayedDataset", {
              id: source.id,
              data: dataset,
            })
          })
          promisesArray.push(resp)
        } else {
          // add source to map
          // this.log && console.log("C-MapboxGL / loadUrlSources - url (!loadInStore) ... addSource ...")
          mapBoxSrcObj.data = source.url
          if (source.generateId) mapBoxSrcObj.generateId = source.generateId
          mapbox.addSource(source.id, mapBoxSrcObj)
        }
      }
      return Promise.all(promisesArray)
    },

    loadLayers(layersArray) {
      // let mapbox = this.map
      let mapbox = _map
      // this.log && console.log("\nC-MapboxGL / loadLayers ", "... ".repeat(10))
      // this.log && console.log("\n")

      // ADDING LAYERS TO MAP
      for (let layer of layersArray) {
        // let layer_ = { ...layer }
        // this.log &&
        //   console.log("C-MapboxGL / loadLayers ... layer.id : ", layer.id)
        mapbox.addLayer(layer)
      }
    },

    loadClicEvents(mapsArray) {
      // let mapbox = this.map
      let mapbox = _map
      this.log &&
        console.log("\nC-MapboxGL / loadClicEvents ", "... ".repeat(10))

      // let sourcesList = mapbox.getStyle().sources
      // this.log && console.log("\nC-MapboxGL / loadClicEvents ... sourcesList : ", sourcesList)

      // let layersList = mapbox.getStyle().layers
      // this.log && console.log("C-MapboxGL / loadClicEvents ... layersList : ", layersList, "\n\n")

      for (let mapRef of mapsArray) {
        if (mapRef.clicEvents) {
          for (let clicEvent of mapRef.clicEvents) {
            this.log &&
              console.log(
                "\nC-MapboxGL / loadClicEvents ... clicEvent.layer : ",
                clicEvent.layer,
                " / event :",
                clicEvent.event
              )
            // this.log && console.log("C-MapboxGL / loadClicEvents ... clicEvent : ", clicEvent)

            let clicFunctions = clicEvent.functions

            mapbox.on(clicEvent.event, clicEvent.layer, (e) => {
              let featuresItem = mapbox.queryRenderedFeatures(e.point, {
                layers: [clicEvent.layer],
              })

              if (
                typeof featuresItem !== "undefined" &&
                featuresItem.length > 0
              ) {
                let item = featuresItem[0]
                let itemSource = item.source
                let itemLayer = item.layer
                let itemProps = item.properties

                // DEBUGGING
                // if( clicEvent.event == 'click' ) {
                //   this.log && console.log( "... clicEvent.event : ", clicEvent.event )
                //   this.log && console.log( "... featuresItem : ", featuresItem )
                //   this.log && console.log( "... itemSource : ", itemSource )
                //   this.log && console.log( "... itemProps : ", itemProps )
                // }

                for (let fn of clicFunctions) {
                  let funcParams = fn.funcParams

                  let params = funcParams && {
                    zoomRange: funcParams.zoomRange,
                    source: itemSource,
                    propName: funcParams.propName,
                    prop: itemProps[funcParams.propName],
                    props: itemProps,
                  }

                  switch (fn.funcName) {
                    case "goToPolygon":
                      this.goToPolygon(params)
                      break

                    case "setChildrenPolygons":
                      params.targets = funcParams.targets
                      this.setChildrenPolygons(params)
                      break

                    case "updateDisplayedData":
                      params.targets = funcParams.targets
                      this.updateDisplayedData(params)
                      break

                    // case 'updateQuery' :
                    //   params.targets = funcParams.targets ;
                    //   this.updateQuery( params ) ;
                    //   break ;

                    case "toggleHighlightOn":
                      this.toggleHighlightOn(e, itemSource)
                      break

                    case "toggleHighlightOff":
                      this.toggleHighlightOff(e, itemSource)
                      break

                    case "toggleSelectedOn":
                      this.toggleSelectedOn(e, itemSource)
                      break

                    // case 'toggleSelectedOff' :
                    //   this.toggleSelectedOff(e, itemSource ) ;
                    //   break ;
                  }
                }
                this.handleResize()
              }
            })
          }
        }
      }
    },

    // DATA INTERACTIONS - - - - - - - - - - - - - - - - - - //

    getSourceData(params, from = "map") {
      // this.log && console.log("\nC-MapboxGL / getSourceGeoData ... from : ", from)
      // this.log && console.log("C-MapboxGL / getSourceGeoData ... params : ", params)

      // let mapbox = this.map
      let mapbox = _map
      let data

      if (from == "map") {
        let sourcesList = mapbox.getStyle().sources
        // this.log && console.log("C-MapboxGL / getSourceGeoData ... sourcesList : ", sourcesList)
        let source = sourcesList && sourcesList[params.source]
        // this.log && console.log("C-MapboxGL / getSourceGeoData ... source : ", source)
        data =
          source &&
          source.data.features.find(
            (feat) => feat.properties[params.propName] == params.prop
          )
        // this.log && console.log("C-MapboxGL / getSourceGeoData ... data : ", data)
      }

      if (from == "store") {
        data = this.getStoreSourceData(params)
      }

      if (params.format) {
        data = switchFormatFunctions(data, params.format)
      }
      return data
    },

    updateDisplayedData(params) {
      // this.log && console.log("\nC-MapboxGL / updateDisplayedData  : ", "+ ".repeat(10) )
      // this.log && console.log("\nC-MapboxGL / updateDisplayedData ... params : ", params )

      let isFnInZoomRange = this.isInZoomRange(params.zoomRange)
      // this.log && console.log("\nC-MapboxGL / updateDisplayedData ... isFnInZoomRange : ", isFnInZoomRange )

      if (isFnInZoomRange) {
        for (let targetParams of params.targets) {
          // 1 - get data for the update
          targetParams.prop = params.prop
          targetParams.propName = params.propName
          targetParams.props = params.props

          let value = this.getSourceData(targetParams, targetParams.from)
          // this.log && console.log("C-MapboxGL / updateDisplayedData ... value : ", value )

          // 2 - then update displayed data
          let targetData = {
            value: value,
            specialStoreId: targetParams.targetSpecialStoreId,
          }
          this.$store.dispatch("data/setNestedData", targetData) // set element in : store.data.sepcialStore
        }
        this.$store.commit("data/toggleTrigger")
      }
    },

    // TO DO ...
    setChildrenPolygons(params) {
      // this.log && console.log("\nC-MapboxGL / setChildrenPolygons ... params : ", params )
      let isFnInZoomRange = this.isInZoomRange(params.zoomRange)
      let geodata = this.getSourceData(params)
    },

    // TO DO ...
    updateQuery(params) {
      // this.log && console.log("\nC-MapboxGL / updateQuery ... params : ", params )
      let isFnInZoomRange = this.isInZoomRange(params.zoomRange)
      let geodata = this.getSourceData(params)
    },

    // UX FUNCTIONS - - - - - - - - - - - - - - - - - - //

    // ZOOM FUNCTIONS

    goToPolygon(params) {
      // this.log && console.log("\nC-MapboxGL / goToPolygon ... params : ", params )
      let isFnInZoomRange = this.isInZoomRange(params.zoomRange)
      if (isFnInZoomRange) {
        let geodata = this.getSourceData(params)
        let data = {
          type: "FeatureCollection",
          features: [geodata],
        }
        this.fit(data)
        // if (this.isMobileWidth){
        // let currentZoom = this.getCurrentZoom()
        // mapbox.flyTo( {zoom : 9} )
        // }
      }
    },

    fit(geojson) {
      // let mapbox = this.map
      let mapbox = _map
      var _bbox = bbox(geojson)
      let options = { padding: 20, animate: true }
      mapbox.fitBounds(_bbox, options)
    },

    resetZoom() {
      // this.log && console.log("\nC-MapboxGL / resetZoom ... " )
      // let mapbox = this.map
      let mapbox = _map
      mapbox.flyTo({
        center: this.originalCenter,
        zoom: this.originalZoom,
      })
    },

    // HIGHLIGHTS FUNCTIONS

    toggleHighlightOn(event, source) {
      // this.log && console.log("\nC-MapboxGL / toggleHighlightOn ... " )
      // let isFnInZoomRange = this.isInZoomRange( params.zoomRange )
      // if ( isFnInZoomRange ){
      // let mapbox = this.map
      let mapbox = _map
      const canvas = mapbox.getCanvas()
      canvas.style.cursor = "pointer"
      // this.log &&
      //   console.log(
      //     "C-MapboxGL / toggleHighlightOn / event.features : ",
      //     event.features
      //   )
      if (event.features.length > 0) {
        if (this.hoveredStateId[source] !== null) {
          mapbox.setFeatureState(
            { source, id: this.hoveredStateId[source] },
            { hover: false }
          ) // clean all sources to prevent error
        }
        this.hoveredStateId[source] = event.features[0].id
        mapbox.setFeatureState(
          { source, id: this.hoveredStateId[source] },
          { hover: true }
        )
      }
      // }
    },
    toggleHighlightOff(event, source) {
      // let isFnInZoomRange = this.isInZoomRange( params.zoomRange )
      // if ( isFnInZoomRange ){
      // let mapbox = this.map
      let mapbox = _map
      const canvas = mapbox.getCanvas()
      canvas.style.cursor = ""
      if (this.hoveredStateId[source] !== null) {
        mapbox.setFeatureState(
          { source, id: this.hoveredStateId[source] },
          { hover: false }
        )
      }
      // }
    },

    toggleSelectedOn(event, source) {
      let mapbox = _map
      // const canvas = mapbox.getCanvas()
      // canvas.style.cursor = 'pointer'
      // this.log &&
      //   console.log(
      //     "C-MapboxGL / toggleSelectedOn / event.features : ",
      //     event.features
      //   )
      if (event.features.length > 0) {
        if (this.selectedStateId[source] !== null) {
          mapbox.setFeatureState(
            { source, id: this.selectedStateId[source] },
            { selected: false }
          ) // clean all sources to prevent error
        }
        this.selectedStateId[source] = event.features[0].id
        mapbox.setFeatureState(
          { source, id: this.selectedStateId[source] },
          { selected: true }
        )
      }
    },
    toggleAllSelectedOff(event, source) {
      let mapbox = _map
      // const canvas = mapbox.getCanvas()
      // canvas.style.cursor = ''
      if (this.hoveredStateId[source] !== null) {
        mapbox.setFeatureState(
          { source, id: this.hoveredStateId[source] },
          { selected: false }
        )
      }
    },

    // VISIBILITY FUNCTIONS

    switchMapVisibility(mapSelectedId) {
      // let mapbox = this.map
      let mapbox = _map

      let MapVisibilityConfig = this.mapsVisibility.map_switches.find(
        (item) => item.id === mapSelectedId
      )

      let mapSelected = this.maps.find(
        (m) => m.id === MapVisibilityConfig.mapId
      )

      for (let layerId of mapSelected.layers) {
        let visibility = mapbox.getLayoutProperty(layerId, "visibility")
        if (visibility === "visible") {
          mapbox.setLayoutProperty(layerId, "visibility", "none")
        } else {
          mapbox.setLayoutProperty(layerId, "visibility", "visible")
        }
      }
    },

    switchMapsDrawer() {
      this.drawerMapsOpen = !this.drawerMapsOpen
    },

    // switchLegendDrawer(){
    //   this.drawerScalesOpen = !this.drawerScalesOpen
    // },
  },
}
</script>

<style>
.app-loader {
  margin: 1.5em;
  padding: 1.5em;
}
.map {
  height: calc(100vh - 64px);
  /* height: calc(100vh); */
  width: 100%;
  position: relative;
}

/* cf : https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/ */

.legend-block {
  position: absolute;
  z-index: 9;
  bottom: 30px;
}

.legend {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  /* font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif; */
  padding: 10px;
  /* right: 10px; */
}

.legend-bottom-left {
  left: 10px;
}

.legend-bottom-right {
  right: 50px;
}

.layer-switch {
  margin-bottom: 10px;
}

.legend-content {
  margin-top: 0.7em;
}

.legend h4 {
  margin: 0 0 10px;
}

.legend div span {
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  width: 10px;
}

/* LOADERS */

/* from : https://loading.io/css/ */
.lds-roller {
  display: inline-block;
  /* position: absolute;
    z-index:200;
    top: 50%;
    left: 50%; */
  /* margin-top: -40px; */
  margin-left: 30px;
  height: 80px;
  width: 100px;
  border-radius: 10px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}

.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.map .count-and-tabs-container {
  position: absolute;
  top: 1rem;
  width: 100%;
}

.map .count-and-tabs-container .result-count-parent,
.map .count-and-tabs-container .buttons {
  z-index: 2;
}

.map .cis-marker-cluster {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: #a174ac;
  color: white;

  font-size: 16px;
  font-weight: bold;

  border-radius: 50%;
}

.highlighted-project {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.highlighted-project button.close {
  margin: 0.5em 0;
  background-color: transparent;
  border: 0;

  align-self: flex-end;
}

.highlighted-project .card {
  font-size: 0.9em;

  box-shadow: none;
}

.highlighted-project .card .card-content {
  padding: 0.2em 0.5em;
}

.highlighted-project .card .card-content:first-of-type {
  padding-top: 0.5em;
}
.highlighted-project .card .card-content:last-of-type {
  padding-bottom: 0.5em;
}

.highlighted-project .card .card-content h1 {
  font-size: 1.1em;
  font-weight: bold;
}

/* TODO SASS : share this style with search result project card tag style */
.highlighted-project .tag {
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.2em 1em;
  background-color: #767676;
  color: white;
}
</style>
