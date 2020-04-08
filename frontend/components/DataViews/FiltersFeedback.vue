

<style scoped>

</style>


<template>

  <v-toolbar 
    :elevation="filtersUI.elevation"
    dense
    :fixed="true"
    >

    <v-spacer></v-spacer>
    
    <div class="text-center">
      
      <!-- LOOP FILTERS -->
      {{ activatedFilters }}

    </div>

    <v-spacer></v-spacer>

  </v-toolbar>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'FiltersFeedback',

    components: {
    },
    
    props : [
    ],

    mounted(){
      this.log && console.log('C-FiltersFeedback / mounted ...')
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

        activatedFilters : state => state.data.activatedFilters,
        filtersUI : state => state.configUI.filters,

      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale'
      }),

    },
    
    methods : {

    },



  }
</script>

