<style scoped></style>

<template>
  <v-content
    id="routes-tabs"
    class="odm-navbar"
    >
    <v-container
      fluid
      class="ma-0 pa-0"
      >
      <v-tabs
        show-arrows
        centered
        :background-color="routesTabs.backgroundColor"
        :height="routesTabs.height"
        :dark="routesTabs.dark"
        :grow="routesTabs.grow"
        :prev-icon="prevIcon ? 'fas fa-chevron-left' : undefined"
        :next-icon="nextIcon ? 'fas fa-chevron-right' : undefined"
        :icons-and-text="routesTabs.hasIcons"
        >

        <v-tabs-slider 
          v-if="routesTabs.hasSlider"
          :class="routesTabs.sliderClass"
          >
        </v-tabs-slider>

        <v-tab
          v-for="rt in routesTabs.tabs"
          :key="rt.to"
          :to="rt.isNuxtLink ? rt.to : rt.href"
          exact
          nuxt
          >
          <!-- :nuxt="rt.isNuxtLink" -->

          <span v-if="!isMobile">
            {{ rt.title[ locale ] }}
          </span>
          <span v-else>
            {{ rt.titleMobile[ locale ] }}
          </span>

          <v-icon v-if="routesTabs.hasIcons">
            rt.icon
          </v-icon>

        </v-tab>
      </v-tabs>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "TabsRoutes",

  components: {},

  props: [],

  data() {
    return {
      prevIcon: false,
      nextIcon: false,
    }
  },

  watch: {},

  mounted() {
    this.log && console.log("C-TabsRoutes / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,

      mobileBreakpoints: (state) => state.configUX.mobileBreakpoints,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      getLocalRouteConfig: "getLocalRouteConfig",
      routesTabs: "getRoutesTabs",
    }),

    isMobile() {
      let mobileBreakpoints = this.mobileBreakpoints
      let currentBreakpoint = this.$vuetify.breakpoint.name
      let bool = mobileBreakpoints.includes(currentBreakpoint)
      return bool
    },

  },

  methods: {},
}
</script>
