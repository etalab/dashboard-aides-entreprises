

<style scoped>

</style>


<template>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      >

      <!-- DRAWER -->
      <v-app-bar-nav-icon @click.stop="toogleNavbarItem('drawer')" />

      <!-- MINIVARIANT  -->
      <v-btn
        icon
        @click.stop="toogleNavbarItem('miniVariant')"
        >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <!-- CLIP BTN -->
      <v-btn
        icon
        @click.stop="toogleNavbarItem('clipped')"
        >
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <!-- FIXED -->
      <v-btn
        icon
        @click.stop="toogleNavbarItem('fixed')"
        >
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <!-- NAVBAR TITLE -->
      <v-spacer/>
      <v-toolbar-title v-text="appTitle[locale]" />


      <v-spacer />


      <!-- RIGHT DRAWER -->
      <!-- <v-btn
        icon
        @click.stop="toogleNavbarItem('rightDrawer')"
        >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->



    </v-app-bar>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'Navbar',

    components: {
    },

    props : [
    ],

    mounted(){
      this.log && console.log('C-Navbar / mounted ...')
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

        clipped : state => state.navbar.clipped, 
        drawer : state => state.navbar.drawer, 
        fixed : state => state.navbar.fixed, 
        miniVariant : state => state.navbar.miniVariant, 
        right : state => state.navbar.right, 
        rightDrawer : state => state.navbar.rightDrawer, 

      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale'
      }),

    },
    
    methods : {

      toogleNavbarItem( fieldName ) {
        this.$store.commit('setFromNavbar', fieldName )
      },

    },



  }
</script>

