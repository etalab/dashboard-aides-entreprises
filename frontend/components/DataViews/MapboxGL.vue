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
    :class="`map`"
    >

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
    </style>

    <!-- LOADER -->
    <div 
      id="loader-map"
      v-show="showLoader"
      class="lds-roller floating"
      >
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>

    <!-- LAYERS & LEGEND -->
    <div 
      v-if="map"
      id='legend' 
      :class='`legend-block legend-bottom-right`'
      >

      <!-- LAYERS SWITCH -->
      <div 
        v-if="mapsVisibility && mapsVisibility.is_activated"
        class="legend layer-switch" 
        >

        <button 
          class=""
          @click="switchMapsDrawer()"
          >
          {{ mapsVisibility.title[ locale ] }}
        </button>

        <div 
          v-show="drawerMapsOpen"
          class="legend-content"
          >
          <div 
            v-for="(mapRef, index) in mapsVisibility.map_switches"
            :key="index"
            class="field"
            >
            <input 
              class="is-checkradio" 
              :id="mapRef.id" 
              :name="mapRef.id" 
              :checked=" mapRef.default_visible ? 'checked' : false"
              type="checkbox" 
              @click="switchMapVisibility( mapRef.id )"
              >
            <label 
              :for="mapRef.id">
              {{ mapRef.label[ locale ] }}
            </label>
          </div>
        </div>
      </div>


    </div>

    <!-- MAP WITH MAPBOX GL -->
    <no-ssr>
      
      <MglMap
        :access-token="'noToken'"
        :mapStyle.sync="mapOptions.mapStyle"
        :center="mapOptions.center"
        :zoom="mapOptions.zoom"
        :maxZoom="mapOptions.maxZoom"
        :minZoom="mapOptions.minZoom"
        @load="onMapLoaded"
        ref='mapboxDiv'
        >

        <!-- CONTROLS -->
        <MglNavigationControl 
          position="bottom-right" 
        />

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

import { mapState, mapGetters, mapActions } from 'vuex'

import {Mapbox , mapboxgl} from "mapbox-gl";
import { MglMap } from "vue-mapbox";

// let map

import bbox from '@turf/bbox'

import axios from 'axios'
import { getDataFromUrl } from "~/utils/getData.js"
import { transformDataset, buildProperties } from "~/utils/mapbox.js"

import { StylesOSM } from '~/config/mapboxVectorStyles.js'

export default {
  
  name: 'MapboxGL',

  components: {
  },
  
  props : [
    'settings',
  ],

  data(){
    return {

      dataViewType : 'maps',
      viewConfig : undefined,

      showLoader : true, 

      // MAPBOX MAP OBJECT
      map : undefined,

      mapOptions : {
        mapStyle : undefined, 
        zoom : undefined,
        maxZoom : undefined,
        minZoom : undefined,
        currentZoom : undefined,
        center : undefined,
        currentCenter : undefined,
      }, 

      mapsVisibility : undefined,
      drawerMapsOpen : undefined,

      // LAYERS & SOURCES
      sources : undefined,

      maps : undefined,
      layers : undefined,

      // UX
      hoveredStateId : {}

    }

  },

  beforeMount() {

    this.log && console.log("\n- + - MapboxGL component - + - + - + - + - + - + ")
    this.log && console.log("C-MapboxGL / beforeMount ... ")
    
    // set up view config
    this.viewConfig = this.getLocalConfig

    // set up MAPBOX options
    const mapOptionsRoute = this.viewConfig.map_options
    // this.log && console.log("C-MapboxGL / dataset / mapOptionsRoute : ", mapOptionsRoute)

    let mapOptions = {
      mapStyle      : StylesOSM[ mapOptionsRoute.mapStyle ],
      zoom          : mapOptionsRoute.zoom,
      maxZoom       : mapOptionsRoute.maxZoom,
      minZoom       : mapOptionsRoute.minZoom,
      currentZoom   : mapOptionsRoute.currentZoom,
      center        : [ mapOptionsRoute.center[1], mapOptionsRoute.center[0] ],
      currentCenter : mapOptionsRoute.currentCenter,
    }
    this.mapOptions = mapOptions

    // setup sources
    this.sources = this.viewConfig.sources

    // setup maps
    this.maps = this.viewConfig.maps

    // setup layers
    this.layers = this.viewConfig.layers

    // setup drawers
    this.mapsVisibility = this.viewConfig.maps_visibility
    this.drawerMapsOpen = this.mapsVisibility && this.mapsVisibility.is_drawer_open
   
  },

  mounted(){
    this.log && console.log('C-MapboxGL / mounted ...')
  },

  watch: {

    map (next, prev){

      if (next && !prev) {

        this.log && console.log('C-MapboxGL / watch - map is created ')

        let storeSourcesArray = this.sources.filter( s => s.from === 'store')
        this.loadStoreSources( storeSourcesArray )

        let urlSourcesArray = this.sources.filter( s => s.from === 'url')
        this.loadUrlSources( urlSourcesArray )
        .then(() => {
          this.loadLayers( this.layers )
          this.loadClicEvents( this.maps )
          this.showLoader = false 
        })

      }

    },

  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,
      mapUI : state => state.configUI.map,
    }),

    ...mapGetters({
      getCurrentLocale : 'getCurrentLocale',
      getDataViewConfig : 'getDataViewConfig',
    }),

    // config
    getLocalConfig(){
      let viewId = {
        dataViewType : this.dataViewType,
        id : this.settings.id,
      }
      let localConfig = this.getDataViewConfig( viewId )
      return localConfig
    },

  },
  
  methods : {

    ...mapActions({
      // setDisplayedDataset : 'data/setDisplayedDataset',
    }),

    // INITIIALIZATION - - - - - - - - - - - - - - - - - - //

      // loaded (_map) {
      //   map =_map 
      //   this.map = _map
      // },

      onMapLoaded(event) {
        this.log && console.log("C-MapboxGL / onMapLoaded ... ")
        // store in component
        this.map = event.map
        // in store => WARNING : object too complex to be stored/mutated in vuex so far
        // check : https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
      },


    // LOADERS - - - - - - - - - - - - - - - - - - //

      loadStoreSources( sourcesArray ){

        this.log && console.log("\nC-MapboxGL / loadSources ", "... ".repeat(10)) 
        let mapbox = this.map
        let store = this.$store

        // STORE SOURCES (loaded as initData @ middleware GetInitData.js )
        for ( let source of sourcesArray ){
          
          this.log && console.log("\nC-MapboxGL / loadSources - store ... source.id : ", source.id)
          this.log && console.log("C-MapboxGL / loadSources - store ... source.help : ", source.help)
          let mapBoxSrcObj = {
            type : source.type,
          }

          // retrieve source from store 'state.data.initData'
          let dataset = store.getters['data/getFromInitData']( source.fromId )
          // this.log && console.log("C-MapboxGL / loadSources - store ... dataset : ", dataset)

          // transform to source.type if necessary
          if ( source.needTransform ) {
            let geoCanvas = store.getters['data/getFromInitData']( source.transformTo.geoCanvasId ).data
            dataset = transformDataset( source, dataset, geoCanvas )
          }

          // this.log && console.log("C-MapboxGL / loadSources - store ... dataset : ", dataset)

          // add source to map
          // this.log && console.log("C-MapboxGL / loadSources - store ... addSource ...")
          mapBoxSrcObj.data = {...dataset}
          if (source.generateId) mapBoxSrcObj.generateId = source.generateId 
          mapbox.addSource( source.id, mapBoxSrcObj )

          // add source to store 
          store.dispatch('data/setDisplayedDataset', {
            id : source.id,
            data : dataset,
          })

        }

      },

      loadUrlSources( sourcesArray ){

        this.log && console.log("\nC-MapboxGL / loadSources ", "... ".repeat(10)) 
        let mapbox = this.map
        let store = this.$store

        // URL SOURCES
        let promisesArray = []
        for ( let source of sourcesArray ){
          
          this.log && console.log("\nC-MapboxGL / loadSources - url ... source.id : ", source.id)
          this.log && console.log("C-MapboxGL / loadSources - url ... source.help : ", source.help)
          let mapBoxSrcObj = {
            type : source.type,
          }

          if ( source.loadInStore ) {
            let resp = axios.get( source.url )
            resp.then( r => {
              let dataset = r.data
              // this.log && console.log("C-MapboxGL / loadSources - url ... dataset : ", dataset)

              // add source to map
              // this.log && console.log("C-MapboxGL / loadSources - url ... addSource ...")
              mapBoxSrcObj.data = {...dataset}
              if (source.generateId) mapBoxSrcObj.generateId = source.generateId 
              mapbox.addSource( source.id, mapBoxSrcObj )

              // add source to store - displayedData
              store.dispatch('data/setDisplayedDataset', {
                id : source.id,
                data : dataset,
              })
            })
            promisesArray.push(resp)
          } 
          else {
            // add source to map
            // this.log && console.log("C-MapboxGL / loadSources - url (!loadInStore) ... addSource ...")
            mapBoxSrcObj.data = source.url
            if (source.generateId) mapBoxSrcObj.generateId = source.generateId 
            mapbox.addSource( source.id, mapBoxSrcObj )
          }
        }
        return Promise.all( promisesArray )

      },

      loadLayers( layersArray ){

        let mapbox = this.map
        this.log && console.log("\nC-MapboxGL / loadLayers ", "... ".repeat(10))
        this.log && console.log("\n")

        // ADDING LAYERS TO MAP
        for (let layer of layersArray ){
          // let layer_ = { ...layer }
          this.log && console.log("C-MapboxGL / loadLayers ... layer.id : ", layer.id)
          mapbox.addLayer( layer )

        }

      },

      loadClicEvents( mapsArray ){

        let mapbox = this.map
        this.log && console.log("\nC-MapboxGL / loadClicEvents ", "... ".repeat(10))

        // let sourcesList = mapbox.getStyle().sources
        // this.log && console.log("\nC-MapboxGL / loadClicEvents ... sourcesList : ", sourcesList)

        // let layersList = mapbox.getStyle().layers
        // this.log && console.log("C-MapboxGL / loadClicEvents ... layersList : ", layersList, "\n\n")

        for (let mapRef of mapsArray ){

          if ( mapRef.clicEvents ){

            for (let clicEvent of mapRef.clicEvents ){
              
              this.log && console.log("\nC-MapboxGL / loadClicEvents ... clicEvent.layer : ", clicEvent.layer, " / event :", clicEvent.event )
              this.log && console.log("C-MapboxGL / loadClicEvents ... clicEvent : ", clicEvent)
              
              let clicFunctions = clicEvent.functions

              mapbox.on( clicEvent.event, clicEvent.layer, e => {
                
                let featuresItem = mapbox.queryRenderedFeatures( e.point, { layers: [ clicEvent.layer ] } )
                
                if ( typeof featuresItem !== 'undefined' ){

                  let item       = featuresItem[0]
                  let itemSource = item.source
                  let itemLayer  = item.layer
                  let itemProps  = item.properties
  
                  // DEBUGGING
                  if( clicEvent.event == 'click' ) {
                    this.log && console.log( "... clicEvent.event : ", clicEvent.event )
                    this.log && console.log( "... featuresItem : ", featuresItem )
                    this.log && console.log( "... itemSource : ", itemSource )
                    this.log && console.log( "... itemProps : ", itemProps )
                  }
                  
                  for ( let fn of clicFunctions ){
                    
                    let funcParams = fn.funcParams 

                    let params = funcParams && {
                      source   : itemSource,
                      propName : funcParams.propName ,
                      prop     : itemProps[ funcParams.propName ],
                    }

                    switch( fn.funcName ){

                      case 'goToPolygon' : 
                        this.goToPolygon( params ) ;
                        break ; 

                      case 'getChildrenPolygons' : 
                        params.targets = funcParams.targets ;
                        this.getChildrenPolygons( params) ;
                        break ; 

                      case 'updateDisplayedData' : 
                        params.targets = funcParams.targets ;
                        this.updateDisplayedData( params ) ;
                        break ; 

                      case 'updateQuery' : 
                        params.targets = funcParams.targets ;
                        this.updateQuery( params ) ;
                        break ; 

                      case 'toggleHighlightOn' : 
                        this.toggleHighlightOn(e, itemSource ) ; 
                        break ;

                      case 'toggleHighlightOff' : 
                        this.toggleHighlightOff(e, itemSource ) ; 
                        break ;
                    }
                  }


                }


              })
    
            }
            
          }

        }

      },

    // INTERACTIONS - - - - - - - - - - - - - - - - - - //

      getChildrenPolygons( params ){
        this.log && console.log("\nC-MapboxGL / getChildrenPolygons ... params : ", params )
      },
      updateDisplayedData( params ){
        this.log && console.log("\nC-MapboxGL / updateDisplayedData ... params : ", params )
      },
      updateQuery( params ){
        this.log && console.log("\nC-MapboxGL / updateQuery ... params : ", params )
      },


    // UX FUNCTIONS - - - - - - - - - - - - - - - - - - //

      // ZOOM FUNCTIONS

      goToPolygon ( params ) {
        this.log && console.log("\nC-MapboxGL / goToPolygon ... params : ", params )
        
        let sourcesList = this.map.getStyle().sources
        // this.log && console.log("C-MapboxGL / goToPolygon ... sourcesList : ", sourcesList)

        let source = sourcesList && sourcesList[ params.source ]
        // this.log && console.log("C-MapboxGL / goToPolygon ... source : ", source)

        let geodata = source && source.data.features.find( feat => feat.properties[ params.propName ] == params.prop )
        // this.log && console.log("C-MapboxGL / goToPolygon ... geodata : ", geodata)
        
        let data = {
          type: 'FeatureCollection',
          features: [ geodata ]
        }
        this.fit(data)
      },
      fit (geojson) {
        var _bbox = bbox(geojson)
        this.map.fitBounds(_bbox, { padding: 20, animate: true })
      },

      // HIGHLIGHTS FUNCTIONS

      toggleHighlightOn (event, source) {
        let mapbox = this.map
        const canvas = mapbox.getCanvas()
        canvas.style.cursor = 'pointer'
        if (event.features.length > 0) {
          if (this.hoveredStateId[source] !== null) {
            mapbox.setFeatureState({ source, id: this.hoveredStateId[source] }, { hover: false }) // clean all sources to prevent error
          }
          this.hoveredStateId[source] = event.features[0].id
          mapbox.setFeatureState({ source, id: this.hoveredStateId[source] }, { hover: true })
        }
      },

      toggleHighlightOff (event, source) {
        let mapbox = this.map
        const canvas = mapbox.getCanvas()
        canvas.style.cursor = ''
        if (this.hoveredStateId[source] !== null) {
          mapbox.setFeatureState({ source, id: this.hoveredStateId[source] }, { hover: false })
        }
      },






      // VISIBILITY FUNCTIONS

      switchMapVisibility( mapSelectedId ){

        let mapbox = this.map 

        let MapVisibilityConfig = this.mapsVisibility.map_switches.find( item => item.id === mapSelectedId ) 
        
        let mapSelected = this.maps.find( m => m.id === MapVisibilityConfig.mapId )
        
        for (let layerId of mapSelected.layers ){
          let visibility = mapbox.getLayoutProperty( layerId, 'visibility');
          if (visibility === 'visible') {
            mapbox.setLayoutProperty(layerId, 'visibility', 'none');
          } else {
            mapbox.setLayoutProperty(layerId, 'visibility', 'visible');
          }
        }

      },

      switchMapsDrawer(){
        this.drawerMapsOpen = !this.drawerMapsOpen
      },

      // switchLegendDrawer(){
      //   this.drawerScalesOpen = !this.drawerScalesOpen
      // },

  },



}
</script>




<style>
  
  /* cf : https://docs.mapbox.com/mapbox-gl-js/example/updating-choropleth/ */

  .legend-block {
    position: absolute;
    z-index: 9;
    bottom: 30px;
  }

  .legend {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.10);
    /* font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif; */
    padding: 10px;
    /* right: 10px; */
  }
  
  .legend-bottom-left{
    left: 10px;
  }
  
  .legend-bottom-right{
    right: 50px;
  }

  .layer-switch{
    margin-bottom: 10px; 
  }

  .legend-content{
    margin-top: .7em; 
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
  .floating {
    position: absolute;
    z-index:200;
    top: 50%;
    left: 50%;
  }

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


  .app-loader {
    margin: 1.5em;
    padding: 1.5em
  }
  .map { 
    height: calc(100vh - 120px); 
    width: 100%;
    position: relative;
  }




  .map .count-and-tabs-container{
    position: absolute;
    top: 1rem;
    width: 100%;
  }

  .map .count-and-tabs-container .result-count-parent,
  .map .count-and-tabs-container .buttons{
    z-index: 2;
  }

  .map .cis-marker-cluster{
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

  .highlighted-project{
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }

  .highlighted-project button.close{
    margin: 0.5em 0;
    background-color: transparent;
    border: 0;

    align-self: flex-end;
  }

  .highlighted-project .card{
    font-size: 0.9em;
      
    box-shadow: none;
  }

  .highlighted-project .card .card-content{
    padding: 0.2em 0.5em;   
  }

  .highlighted-project .card .card-content:first-of-type{
    padding-top: 0.5em;
  }
  .highlighted-project .card .card-content:last-of-type{
    padding-bottom: 0.5em;
  }

  .highlighted-project .card .card-content h1{
    font-size: 1.1em;
    font-weight: bold;
  }

  /* TODO SASS : share this style with search result project card tag style */
  .highlighted-project .tag{
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0.2em 1em;
    background-color: #767676;
    color: white;
  }

</style>