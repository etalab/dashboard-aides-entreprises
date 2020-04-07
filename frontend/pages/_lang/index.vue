<template>

  <div id="homepage">

    <!-- <Filters/> -->

    <v-layout
      column
      justify-center
      align-center
      >

      <!-- <Table/> -->

      <v-flex
        xs12
        sm8
        md6
        >

        <v-card>

          <v-card-title class="headline">
            {{ $t('home.title') }} 
          </v-card-title>

          <v-card-text>

            <hr class="my-3">

            <p>
              {{ backendApi }}
            </p>

          </v-card-text>


          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              nuxt
              to="/inspire"
              >
              {{ $t('navigation.continue') }}
            </v-btn>
          </v-card-actions>


        </v-card>

      </v-flex>


    </v-layout>

  </div>

</template>





<script>

  import { mapState, mapGetters } from 'vuex'

  import Filters from '~/components/DataViews/Filters.vue'
  import Table from '~/components/DataViews/Table.vue'

  export default {
    
    name: 'Homepage',

    components: {
      Filters,
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
