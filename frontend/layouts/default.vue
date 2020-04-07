<template>
  <v-app >


    <!-- LEFT DRAWER -->
    <Drawer/>


    <!-- NAVBAR -->
    <Navbar/>



    <!-- CONTENT LAYOUT -->
    <v-content id="layout-content">
      
      <Filters/>
      
      <v-container 
        id="layout-container"
        fluid
        >
        <nuxt />
      </v-container>
    
    </v-content>



    <!-- RIGHT DRAWER -->
    <!-- 
      <v-navigation-drawer
        v-model="rightDrawer"
        :right="right"
        temporary
        fixed
        >
        <v-list>
          <v-list-item @click.native="right = !right">
            <v-list-item-action>
              <v-icon light>
                mdi-repeat
              </v-icon>
            </v-list-item-action>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> 
    -->


    <!-- FOOTER -->
    <Footer/>>



  </v-app>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  import Navbar from '~/components/UX/Navbar.vue'
  import Drawer from '~/components/UX/Drawer.vue'
  import Filters from '~/components/DataViews/Filters.vue'
  import Footer from '~/components/UX/Footer.vue'


  export default {

    head(){ 
      
      // let global = this.globalConfig

      return {
        // title: global.app_title.content,
        // meta: [

        // ],
        link: [
          // { rel: 'icon', type: 'image/x-icon', href: global.app_favicon.url },
          // { rel: 'icon', href: global.app_favicon.url, sizes: '32x32' },
        ],
      }
    },

    components: {
      Navbar,
      Drawer,
      Filters,
      Footer,
    },

    data () {
      return {
      }
    },

    computed: {

      ...mapState({

        log : state => state.log, 
        locale : state => state.locale,
        title : state => state.title, 

        clipped : state => state.navbar.clipped, 
        drawer : state => state.navbar.drawer, 
        fixed : state => state.navbar.fixed, 
        items : state => state.navbar.items, 
        miniVariant : state => state.navbar.miniVariant, 
        right : state => state.navbar.right, 
        rightDrawer : state => state.navbar.rightDrawer, 

      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale'
      }),

    },

  }
</script>
