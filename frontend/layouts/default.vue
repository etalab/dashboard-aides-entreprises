<style scoped>
body {
  padding-top: constant(safe-area-inset-top); /* iOS 11.0 */
  padding-top: env(safe-area-inset-top); /* iOS 11.2 */
}
</style>

<template>
  <v-app>
    <!-- DYNAMIC CSS -->
    <DynamicCSS />

    <!-- LEFT DRAWER -->
    <Drawer v-if="routeDrawer" />

    <!-- NAVBAR -->
    <Navbar />

    <!-- CONTENT LAYOUT -->
    <v-content id="layout-content">
      <Filters />

      <!-- <FiltersFeedback/> -->
      <v-container id="layout-container" fluid pa-0>
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

export default {
  components: {
    DynamicCSS,
    Navbar,
    Drawer,
    Filters,
    FiltersFeedback,
    Footer,
    NavbarFooter,
  },

  data() {
    return {}
  },

  beforeMount() {
    this.log && console.log("\n", ". ".repeat(20))
    this.log && console.log("L-default / beforeMount ...")

    // NOT WORKING IN SPA MODE !!!
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

      vuetifyThemeIsSet: (state) => state.configs.vuetifyThemeIsSet,

      configUI: (state) => state.configUI,
      configUX: (state) => state.configUX,
      navbarHeight: (state) => state.navbar.height,
      windowSize: (state) => state.windowSize,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
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
  },

  methods: {},
}
</script>
