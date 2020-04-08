<template>

  <div id="rawData">

    <hr>
    <br>

    <v-row>
      <v-col
        align-center
        >
        <div class="text-center">
          <code>activatedFilters</code>
        </div>
        <div class="text-center">
          <!-- <code> -->
            {{ activatedFilters }}
          <!-- </code> -->
        </div>
      </v-col>
    </v-row>
    <br>

    <hr>

    <v-row>

      <!-- INIT DATA -->
      <v-col
        >

        <div class="text-center">
          loop in <code>initData</code>
        </div><br>

        <div 
          v-for="(val, property, index) in initData"
          :key="index">
          <hr><br>
          <p>field : 
            <code>{{ property }}</code>
          </p>
          <div>
            <code>
              {{ val.slice(0,1) }}
              [ ... ]
            </code>
          </div>
          <br>
        </div>

      </v-col>


      <!-- DISPLAYED DATA -->
      <v-col
        >

        <div class="text-center">
          loop in <code>displayedData</code>
        </div><br>

        <div 
          v-for="(val, property, index) in displayedData"
          :key="index">
          <hr><br>
          <p>field : 
            <code>{{ property }}</code>
          </p>
          <div>
            <code>
              {{ val.slice(0,1) }}
              [ ... ]
            </code>
          </div>
          <br>
        </div>

      </v-col>

    </v-row>

  </div>

</template>





<script>

  import { mapState, mapGetters } from 'vuex'


  export default {
    
    name: 'PageRawData',

    components: {
    },
    
    props : [
    ],

    mounted(){
      this.log && console.log('P-PageRawData / mounted ...')
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

        activatedFilters : state => state.data.activatedFilters,

        initData : state => state.data.initData,
        displayedData : state => state.data.displayedData,

      }),

      ...mapGetters({

        getCurrentLocale : 'getCurrentLocale',
        // activatedFilters : 'data/getActivatedFilters',

      }),

    },
    
    methods : {

    },



  }
</script>
