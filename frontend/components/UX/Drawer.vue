<template>
  
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
    >

    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="$t(item.i18nTitle)" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>


</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'Drawer',

    components: {
    },

    props : [
    ],

    mounted(){
      this.log && console.log('C-Drawer / mounted ...')
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
        appTitle : state => state.appTitle, 

        items : state => state.navbar.items, 

        clipped : state => state.navbar.clipped, 
        drawer : state => state.navbar.drawer, 
        fixed : state => state.navbar.fixed, 
        miniVariant : state => state.navbar.miniVariant, 

      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale'
      }),

    },
    
    methods : {

    },



  }
</script>