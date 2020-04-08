

<style scoped>

</style>


<template>

  <v-toolbar 
    :elevation="filtersUI.elevation"
    dense
    >

    <v-spacer></v-spacer>
    
    <div class="text-center">
      
      <!-- LOOP FILTERS -->
      <v-menu 
        offset-y
        v-for="(filter, index) in filters"
        :key="index"
        >

        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            text
            v-on="on"
            >
            {{ filter.name[ locale ] }}
            <v-icon> mdi-menu-down </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in filter.options"
            :key="i"
            @click=""
            >
            <v-list-item-title>
              {{ item.label[ locale ] }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>

    </div>

    <v-spacer></v-spacer>

  </v-toolbar>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'Filters',

    components: {
    },
    
    props : [
    ],

    mounted(){
      this.log && console.log('C-Filters / mounted ...')
    },

    watch: {
    },

    data(){
      return {
        items: [
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me 2' },
        ],
      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,

        filters : state => state.data.filters,
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

