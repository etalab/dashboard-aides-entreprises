<style scoped>
  .has-scrollbar {
    overflow-y:scroll !important;
  }
</style>

<template>

  <div id="homepage">

    <style>
    </style>
    <!-- {{ routeConfig }} -->

    <v-row
      no-gutters
      v-for="(row, index) in routeConfig.pageRows"
      :key="'R'+index"
      :id="'R'+index"
      >
      
      <template
        v-if="row.activated"
        >

        <v-col
          v-for="(col, i) in row.columns"
          :key="'R'+index+'-C'+i"
          :id="'R'+index+'-C'+i"
          :class="`${col.colClass}`"
          >

          <template
            v-if="col.activated"
            >
            
            <!-- 
            {{ windowSize }}
            {{ contentWindowHeight }} 
            -->
            <div 
              :class="`${ col.hasScrollbar ? 'has-scrollbar' : ''}`"
              :style="`${ col.hasScrollbar ? 'max-height:'+contentWindowHeight+'px' : ''}`"
              >

              <v-row
                no-gutters
                v-for="(colRow, iRow) in col.colRows"
                :key="'R'+index+'-C'+i+'-CR'+iRow"
                :id="'R'+index+'-C'+i+'-CR'+iRow"
                :justify="colRow.justify"
                :align="colRow.align"
                :class="colRow.class"
                >

                <TextFrame
                  v-if="colRow.activated && colRow.component == 'text' "
                  :settings="colRow.settings"
                />

                <Numbers
                  v-if="colRow.activated && colRow.component == 'numbers' "
                  :settings="colRow.settings"
                />

                <MapboxGL
                  v-if="colRow.activated && colRow.component == 'map' "
                  :settings="colRow.settings"
                />
                
                <ApexChart
                  v-if="colRow.activated && colRow.component == 'apexchart' "
                  :settings="colRow.settings"
                />

                <ChartJS
                  v-if="colRow.activated && colRow.component == 'chartjs' "
                  :settings="colRow.settings"
                />

                <Table
                  v-if="colRow.activated && colRow.component == 'table' "
                  :settings="colRow.settings"
                />

              </v-row>

            </div>
            
          </template>

        </v-col>

      </template>

    </v-row>

  </div>

</template>





<script>

  import { mapState, mapGetters } from 'vuex'

  import Filters from '~/components/DataViews/Filters.vue'

  import MapboxGL from '~/components/DataViews/MapboxGL.vue'
  import Numbers from '~/components/DataViews/Numbers.vue'
  import ChartJS from '~/components/DataViews/ChartJS.vue'
  import ApexChart from '~/components/DataViews/ApexChart.vue'
  import TextFrame from '~/components/DataViews/TextFrame.vue'
  import Table from '~/components/DataViews/Table.vue'

  export default {
    
    name: 'Homepage',

    components: {
      Filters,
      MapboxGL,
      Numbers,
      ChartJS,
      ApexChart,
      TextFrame,
      Table,
    },
    
    props : [
    ],

    mounted(){
      this.log && console.log('P-Homepage / mounted ...')
    },

    watch: {
    },

    data(){
      return {
        fixed: false,
      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,

        backendApi : state => state.data.backendApi,
        filters : state => state.data.filters,

        initData : state => state.data.initData,
        data : state => state.data.displayedData,

        navbarHeight : state => state.navbar.height,
      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale',
        routeConfig : 'getLocalRouteConfig',
        windowSize : 'getWindowsSize',
      }),

      contentWindowHeight() {
        let height = this.windowSize.height - this.navbarHeight
        return height
      },

    },
    
    methods : {

    },



  }
</script>
