<style scoped>
body {
  padding-top: constant(safe-area-inset-top); /* iOS 11.0 */
  padding-top: env(safe-area-inset-top); /* iOS 11.2 */
}
.no-scroll{
  overflow: hidden;
}
</style>

<template>
  <v-app
    id="ODAMAP-root"
    :style="`overflow: hidden; max-height:${isIframe && getIframeMaxHeight ? getIframeMaxHeight : contentWindowHeight}px;`"
  >
    <!-- DYNAMIC CSS -->
    <DynamicCSS />

    <!-- LEFT DRAWER -->
    <Drawer v-if="routeDrawer" />

    <!-- NAVBAR -->
    <Navbar v-if="!isIframe" />

    <!-- TABS ROUTES -->
    <TabsRoutes v-if="routesTabs && routesTabs.isActivated" />

    <!-- CONTENT LAYOUT -->
    <v-content 
      id="ODAMAP-layout-content"
      class="ma-0 pa-0"
      :style="`height: ${contentWindowHeight}px; padding: 0 0 0 0`"
      >
      <Filters />

      <!-- <FiltersFeedback/> -->
      <v-container 
        id="ODAMAP-layout-container"
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

    <!-- NAVBARFOOTER -->
    <NavbarFooter
      v-if="routeNavbarFooter && routeNavbarFooter.activated"
      :settings="routeNavbarFooter.settings"
    />
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

import DynamicCSS from "~/components/UI/DynamicCSS.vue"

import Navbar from "~/components/UX/Navbar.vue"
import Drawer from "~/components/UX/Drawer.vue"
import Filters from "~/components/DataViews/Filters.vue"
import FiltersFeedback from "~/components/DataViews/FiltersFeedback.vue"
import Footer from "~/components/UX/Footer.vue"
import NavbarFooter from "~/components/UX/NavbarFooter.vue"
import TabsRoutes from "~/components/UX/TabsRoutes.vue"

export default {
  components: {
    DynamicCSS,
    Navbar,
    Drawer,
    Filters,
    FiltersFeedback,
    Footer,
    NavbarFooter,
    TabsRoutes,
  },

  data() {
    return {}
  },

  beforeMount() {
    // this.log && console.log("\n", ". ".repeat(20))
    // this.log && console.log("L-default / beforeMount ...")

    // NOT WORKING IN SPA MODE !!!
    // cf : ref on stackoverflow...
    // this.log &&
    //   console.log(
    //     "L-default / beforeMount / this.vuetifyThemeIsSet :",
    //     this.vuetifyThemeIsSet
    //   )
    // if (!this.vuetifyThemeIsSet) {
    //   this.log &&
    //     console.log("L-default / beforeMount / this.configUI :", this.configUI)

    //   let isDarkTheme = this.configUI.isDarkTheme
    //   let themes = this.configUI.themes
    //   this.log &&
    //     console.log(
    //       "L-default / beforeMount / this.$vuetify.theme :",
    //       this.$vuetify.theme
    //     )
    //   this.$vuetify.theme.primary = this.configUI.themes.light.primary
    //   this.$vuetify.theme = {
    //     dark: isDarkTheme,
    //     themes: themes,
    //   }
    // this.$store.commit("configs/setVuetifyThemeIsSet")
    // }
  },

  head() {
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

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      title: (state) => state.appTitle,
      isIframe: (state) => state.isIframe,

      vuetifyThemeIsSet: (state) => state.configs.vuetifyThemeIsSet,

      configUI: (state) => state.configUI,
      configUX: (state) => state.configUX,
      navbarHeight: (state) => state.navbar.height,
      windowSize: (state) => state.windowSize,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      routesTabs: "getRoutesTabs",
      routeConfig: "getLocalRouteConfig",
      getCurrentNavbarFooter: "getCurrentNavbarFooter",
    }),

    routeNavbarFooter() {
      let routeConf = this.routeConfig
      return routeConf && routeConf.navbarFooter
    },

    routeDrawer() {
      let configUX = this.configUX
      return configUX.hasDrawer
    },

    getIframeMaxHeight() {
      return this.configUX.overrideIframeMaxHeight
    },

    windowHeight() {
      let winHeight = window.innerHeight
      return winHeight
    },

    contentWindowHeight() {
      let winHeight = window.innerHeight
      var docNavbars = document.querySelectorAll(`.odm-navbar`)
      let docNavbarsArray = Array.prototype.slice.call(docNavbars)
      let sumNavbarsHeights = docNavbarsArray
        .map((i) => i.offsetHeight)
        .reduce((prev, curr) => prev + curr, 0)
      let height = winHeight - sumNavbarsHeights
      return height
    },

  },

  methods: {},
}
</script>
