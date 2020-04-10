<style scoped>
  .scrollable{
    position: fixed;
  }

</style>

<template>

  <div id="homepage">


    <!-- {{ routeConfig }} -->

    <v-row
      no-gutters
      v-for="(row, index) in routeConfig.pageRows"
      :key="'R'+index"
      :id="'R'+index"
      >
      
      <v-col
        v-for="(col, i) in row.columns"
        :key="'R'+index+'-C'+i"
        :id="'R'+index+'-C'+i"
        :class="`${col.colClass} ${ col.positionFixed ? '' : '' }`"
        :cols="col.cols"
        :sm="col.sm"
        :md="col.md"
        :lg="col.lg"
        :xl="col.xl"
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
            v-if="colRow.component == 'text' "
            :settings="colRow.settings"
          />

          <ApexChart
            v-if="colRow.component == 'chart' "
            :settings="colRow.settings"
          />

          <Numbers
            v-if="colRow.component == 'numbers' "
            :settings="colRow.settings"
          />

          <Table
            v-if="colRow.component == 'table' "
            :settings="colRow.settings"
          />

          <MapboxGL
            v-if="colRow.component == 'map' "
            :settings="colRow.settings"
          />

          <br>
          <hr>
          <br>

        </v-row>

      </v-col>

    </v-row>

  </div>

</template>





<script>

  import { mapState, mapGetters } from 'vuex'

  import Filters from '~/components/DataViews/Filters.vue'

  import Table from '~/components/DataViews/Table.vue'
  import MapboxGL from '~/components/DataViews/MapboxGL.vue'
  import ApexChart from '~/components/DataViews/ApexChart.vue'
  import Numbers from '~/components/DataViews/Numbers.vue'
  import TextFrame from '~/components/DataViews/TextFrame.vue'

  export default {
    
    name: 'Homepage',

    components: {
      Filters,
      Table,
      MapboxGL,
      ApexChart,
      Numbers,
      TextFrame,
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

      }),

      ...mapGetters({

        getCurrentLocale : 'getCurrentLocale',
        routeConfig : 'getLocalRouteConfig',

      }),

    },
    
    methods : {

    },



  }
</script>
