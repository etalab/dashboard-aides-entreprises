

<style scoped>

</style>


<template>

  <v-toolbar dense>

    <v-spacer></v-spacer>
    
    <div class="text-center">

      <v-menu offset-y>

        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            text
            v-on="on"
            >
            Filter 1
            <v-icon> mdi-menu-down </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click=""
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
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

      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale'
      }),

    },
    
    methods : {

    },



  }
</script>

