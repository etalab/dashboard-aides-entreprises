

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
      <v-menu 
        offset-y
        v-for="(filter, index) in filters"
        :key="index"
        >

        <!-- DROPDOWN MENU -->
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

        <!-- MENU OPTIONS -->
        <v-list>
          <v-list-item
            v-for="(filterItem, i) in filter.options"
            :key="i"
            @click="updateActivatedFilters(filter, filterItem)"
            >
            <v-list-item-title>
              {{ filterItem.label[ locale ] }}
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

      updateActivatedFilters( filter, filterItem ) {
        // this.log && console.log('C-Filters / updateActivatedFilters / filterItem : ', filterItem)

        let filterTag = {
          filterCode : filter.filterCode,
          optionValue : filterItem.value
        }

        this.$store.dispatch( 'data/toggleFilters', filterTag )
      }

    },



  }
</script>

