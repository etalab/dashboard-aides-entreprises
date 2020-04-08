<template>

  <div id="homepage">


    <v-layout
      column
      justify-center
      align-center
      >

      <!-- <Table/> -->
      <MapboxGL/>
      <!-- <Table/> -->

    </v-layout>


    <!-- <div>
      filters : 
      <code>{{ filters }}</code>
    </div> -->

    <!-- <div>
       data : <br>
      <code>{{ data }}</code>
    </div> -->



  </div>

</template>





<script>

  import { mapState, mapGetters } from 'vuex'

  import Filters from '~/components/DataViews/Filters.vue'
  import Table from '~/components/DataViews/Table.vue'
  import MapboxGL from '~/components/DataViews/MapboxGL.vue'
  import ApexChart from '~/components/DataViews/ApexChart.vue'

  export default {
    
    name: 'Homepage',

    components: {
      Filters,
      Table,
      MapboxGL,
      ApexChart,
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
        getCurrentLocale : 'getCurrentLocale'
      }),

    },
    
    methods : {

    },



  }
</script>
