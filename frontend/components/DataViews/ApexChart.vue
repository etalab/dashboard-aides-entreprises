

<style scoped>
  .custom-min-height{
    min-height : 300px;
    min-width : 400px;
  }
</style>


<template>

  <v-container
    :id="`apexcharts-${ settings.id }`"
    :class="``"
    :trigger="`${trigger}`"
    >

    <v-layout
      justify-center
      >

      <div 
        :class="`${viewConfig.chartTitleClass}`"
        >
        <!-- {{ trigger }}
        ///  -->
        <!-- {{ $t( viewConfig.titleI18n ) }} -->
        {{ viewConfig.chartTitle[ locale ] }}
      </div>


      <!-- DEBUGGING -->
      <!-- <div justify-center>
        <code>
          localChartOptions : 
          {{ localChartOptions }}
        </code>
      </div> -->


      <!-- DEBUGGING -->
      <!-- <div justify-center>
        <code>
          localSeries : 
          {{ localSeries }}
        </code>
      </div> -->
    </v-layout>
      

    <!-- DEBUGGING -->
    <!-- <v-layout>
      <code>
        getSpecialStore[ 'focusObject']  : <br>
        {{ getSpecialStore[ 'focusObject' ][ 'kpi_top_10_naf' ] }}
      </code> 
    </v-layout> -->



    <v-layout
      justify-center
      :class="`custom-min-height`"
      >

      <apexchart 
        v-if="localChartOptions"
        :series="localSeries"
        :options="localChartOptions" 
        :type="localChartOptions.chart.type" 
        :height="localChartOptions.chart.height" 
        :width="localChartOptions.chart.width" 
        >
      </apexChart>

    </v-layout>

    <!-- {{ localChartOptions }} -->

  </v-container>


</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { switchFormatFunctions } from '~/utils/utils.js'

  // ONLY DISPLAY DATA FROM data.specialStore

  export default {
    
    name: 'ApexChart',

    components: {
    },
    
    props : [
      'settings',
    ],

    beforeMount() {
      // set up view config
      this.log && console.log('C-ApexChart / beforeMount ...')
      
      this.viewConfig = this.getLocalConfig
      this.datasetMappers = this.viewConfig.datasetMappers
    
    }, 

    mounted(){
      this.log && console.log('C-ApexChart / mounted ...')
      // this.localSeries = this.getSeries()
      this.getSeries()
    },

    watch: {
      trigger(next, prev){
        this.log && console.log('C-ApexChart / watch / trigger / prev : ', prev )
        this.log && console.log('C-ApexChart / watch / trigger / next : ', next )
        this.getSeries()
      },
    },

    data(){
      return {

        dataViewType : 'charts',
        viewConfig : undefined,

        mappers : undefined,

        localSeries : undefined,
        localChartOptions : undefined,

      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,
        trigger : state => state.data.triggerChange,
      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale',
        getDataViewConfig : 'getDataViewConfig',
        getSpecialStore : 'data/getSpecialStore',
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

      getSpecialStoreForChartData(){
        this.log && console.log('C-ApexChart / getSpecialStoreForChartData ... ' )
        let specialStoreId = this.datasetMappers.specialStoreId
        let result = (specialStoreId) ? specialStoreId && this.getSpecialStore[ specialStoreId ] : this.getSpecialStore
        return result
      },

    },
    
    methods : {

      getSeries(){
        this.log && console.log('C-ApexChart / getSeries ... ' )
        let specialStoreId = this.datasetMappers.specialStoreId
        let fromDatasetKey = this.datasetMappers.fromDatasetKey
        let chartOptions = this.datasetMappers.chartOptions
        
        let dataSeries = []

        for (let mapper of this.datasetMappers.seriesMappers ){

          let specialStoreRawData = this.getSpecialStoreData( { id: specialStoreId, key: fromDatasetKey } )
          let dataFromKey = mapper.dataFromKey
          let remappedSerie = (dataFromKey)? specialStoreRawData.map( i => i[ dataFromKey ]) : specialStoreRawData

          if (mapper.buildAxisCategsX){
            let settings = mapper.buildAxisCategsXsettings
            let xaxis = { categories : specialStoreRawData.map( i => i[ settings.fromKey ]) }
            chartOptions.xaxis = xaxis
          }

          if ( mapper.format ){
            remappedSerie = remappedSerie.map( value => {
              return  switchFormatFunctions( value, mapper.format )
            })
          }
          let dataSerie = {
            data : remappedSerie,
          }
          dataSeries.push( dataSerie )

        }
        this.localSeries = dataSeries
        this.localChartOptions = chartOptions
      },

      getSpecialStoreData( { id, key } ) {
        this.log && console.log('C-ApexChart / getSpecialStoreData / {id, key} : ', {id, key} )
        let obj = this.getSpecialStore[ id ]
        obj = ( key )? obj[ key ] : key
        return obj
      }, 

    },



  }
</script>

