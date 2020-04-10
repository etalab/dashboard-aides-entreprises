

<style scoped>

</style>


<template>

  <div>

    <div 
      class="text-center"
      >
      {{ $t( viewConfig.titleI18n ) }}
    </div>
    <!-- <div justify-center>
      <code>
        {{ viewConfig }}
      </code>
    </div> -->

    <apexchart 
      :series="series"
      
      :options="chartOptions" 
      
      :type="chartOptions.chart.type" 

      :height="chartOptions.chart.height" 
      :width="chartOptions.chart.width" 
      >
    </apexChart>

  </div>



</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'ApexChart',

    components: {
    },
    
    props : [
      'settings',
    ],

    beforeMount() {
      // set up view config
      this.viewConfig = this.getLocalConfig
      this.series = this.viewConfig.series
      this.chartOptions = this.viewConfig.chartOptions
    }, 

    mounted(){
      this.log && console.log('C-ApexChart / mounted ...')
    },

    watch: {
    },

    data(){
      return {

        dataViewType : 'charts',
        viewConfig : undefined,

        series: undefined,
        chartOptions: undefined,

      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,
      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale',
        getDataViewConfig : 'getDataViewConfig'
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

    },



  }
</script>

