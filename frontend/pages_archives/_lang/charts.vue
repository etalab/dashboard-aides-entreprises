<template>

  <div id="charts">

    <v-layout
      column
      justify-center
      align-center
      >

      <ApexCharts/>

    </v-layout>

  </div>

</template>





<script>

  import { mapState, mapGetters } from 'vuex'

  import ApexChart from '~/components/DataViews/ApexChart.vue'

  export default {
    
    name: 'PageCharts',

    components: {
      ApexChart,
    },
    
    props : [
    ],

    mounted(){
      this.log && console.log('P-PageCharts / mounted ...')
    },

    watch: {
    },

    data(){
      return {
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
