<template>
  <v-app >


    <!-- DYNAMIC CSS -->
    <DynamicCSS/>

    
    <!-- LEFT DRAWER -->
    <Drawer/>


    <!-- NAVBAR -->
    <Navbar/>



    <!-- CONTENT LAYOUT -->
    <v-content id="layout-content">
      
      <Filters/>

      <!-- <FiltersFeedback/> -->
      <v-container 
        id="layout-container"
        fluid
        pa-0
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
            <v-list-item-title>Switch drawer (click me) </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> 
    -->


    <!-- FOOTER -->
    <!-- <Footer/> -->



  </v-app>
</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  import DynamicCSS from '~/components/UI/DynamicCSS.vue'

  import Navbar from '~/components/UX/Navbar.vue'
  import Drawer from '~/components/UX/Drawer.vue'
  import Filters from '~/components/DataViews/Filters.vue'
  import FiltersFeedback from '~/components/DataViews/FiltersFeedback.vue'
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
      DynamicCSS,
      Navbar,
      Drawer,
      Filters,
      FiltersFeedback,
      Footer,
    },

    data () {
      return {
        window : {
          width: 0,
          height: 0
        }
      }
    },

    created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },

    computed: {

      ...mapState({

        log : state => state.log, 
        locale : state => state.locale,
        title : state => state.appTitle, 

        navbarHeight : state => state.navbar.height,
        windowSize : state => state.windowSize,

      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale',
      }),

    },

    methods : {

      ...mapActions({
        setCurrentWindowSize : 'setCurrentWindowSize',
      }),

      handleResize() {
        this.window.width = window.innerWidt
        this.window.height = window.innerHeight
        this.setCurrentWindowSize( {
          width : window.innerWidth,
          height : window.innerHeight,
        })
      }
    }

  }
</script>
