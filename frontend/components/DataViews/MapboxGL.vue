

<style src="mapbox-gl/dist/mapbox-gl.css"></style>
<style lang="scss" scoped>
   .spot__map {
    margin: 0 20px;
    width: auto;
    .mgl-map-wrapper {
      position: absolute;
    }
  }
</style>



<template>

  <div class="map">

      <!-- MAP WITH MAPBOX GL -->
      <no-ssr>
        
        <MglMap
          :access-token="'noToken'"
          :mapStyle.sync="mapStyle"
          :center="center"
          :zoom="zoom"
          :maxZoom="maxZoom"
          :minZoom="minZoom"
          @load="onMapLoaded"
          ref='mapboxDiv'
          >

          <!-- CONTROLS -->
          <MglNavigationControl position="bottom-right" />

        </MglMap>
  
      </no-ssr>

  </div>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import mapboxgl from 'mapbox-gl'

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

      // MAPBOX MAP OBJECT
      map : undefined,
      mapStyle : undefined, 

      contentFields : undefined,
      mapOptionsRoute : undefined,

      fieldLat : undefined,
      fieldLong : undefined,

      zoom : undefined,
      maxZoom : undefined,
      minZoom : undefined,
      currentZoom : undefined,
      center : undefined,
      currentCenter : undefined,

      layersVisibility : undefined,
      drawerLayersOpen : undefined,

    }

  },

  beforeMount() {
    this.log && console.log("\n- + - SearchResultsMapbox - + - + - + - + - + - + ")
    this.log && console.log("C-SearchResultsMapbox / beforeMount ... ")

    // set up fields mapper
    this.contentFields = this.mapConfig.contents_fields
    this.log && console.log("C-SearchResultsMapbox / contentFields : \n", this.contentFields)

    // set up MAPBOX options
    const mapOptionsRoute = this.mapConfig.map_options
    this.log && console.log("C-SearchResultsMapbox / mapOptionsRoute : \n", mapOptionsRoute)

    this.mapStyle    = StylesOSM[ mapOptionsRoute.mapStyle ]

    this.fieldLat    = this.mapConfig.lat_long_fields.latitude
    this.fieldLong   = this.mapConfig.lat_long_fields.longitude

    this.zoom        = mapOptionsRoute.zoom
    this.maxZoom     = mapOptionsRoute.maxZoom
    this.minZoom     = mapOptionsRoute.minZoom
    this.currentZoom = mapOptionsRoute.currentZoom

    this.center      = [ mapOptionsRoute.center[1], mapOptionsRoute.center[0] ]
    // this.center = [0,0]

    this.currentCenter = mapOptionsRoute.currentCenter

    // LEGACTY LEAFLET
    // this.url = mapOptions.url
    // this.attribution = mapOptions.attribution
    // this.subdomains = mapOptions.subdomains

    this.layersVisibility = mapOptionsRoute.layers_visibility
    this.drawerLayersOpen = this.layersVisibility && this.layersVisibility.is_drawer_open

  },

  mounted(){
    this.log && console.log('C-MapboxGL / mounted ...')
  },

  watch: {
  },


  computed: {

    ...mapState({

      log : state => state.log, 
      locale : state => state.locale,

      mapConfig : state => state.configMap

    }),

    ...mapGetters({
      getCurrentLocale : 'getCurrentLocale'
    }),

  },
  
  methods : {

    // - - - - - - - - - - - - - - - - - - //
    onMapLoaded(event) {

      this.log && console.log("\nC-MapboxGL / onMapLoaded ... ")
      
      // store in component
      this.map = event.map;

      // in store => WARNING : object too complex to be stored/mutated in vuex so far
      // check : https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
    },



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
  .lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background:  #513085;
    margin: -3px 0 0 -3px;
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