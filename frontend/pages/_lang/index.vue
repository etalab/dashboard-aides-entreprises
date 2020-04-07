<template>

  <v-layout
    column
    justify-center
    align-center
    >


    <v-flex
      xs12
      sm8
      md6
      >

      <div class="text-center">

      </div>

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

</template>





<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'Homepage',

    components: {
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
      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale'
      }),

    },
    
    methods : {

    },



  }
</script>
