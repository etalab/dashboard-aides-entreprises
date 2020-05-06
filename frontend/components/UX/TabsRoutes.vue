<style scoped></style>

<template>

  <v-card>
    <v-tabs
      show-arrows
      :dark="routesTabs.dark"
      :grow="routesTabs.grow"
      >
      <v-tabs-slider 
        v-if="routesTabs.hasSlider"
        :class="routesTabs.sliderClass"
        >
      </v-tabs-slider>

      <v-tab
        v-for="rt in routesTabs.tabs"
        :key="rt"
        :href="rt.to"
        >

        <span v-if="!isMobile">
          {{ rt.title[ locale ] }}
        </span>
        <span v-else>
          {{ rt.titleMobile[ locale ] }}
        </span>

      </v-tab>
    </v-tabs>
  </v-card>

</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "TabsRoutes",

  components: {},

  props: [],

  data() {
    return {}
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
      routesTabs: "getRoutesTabs",
    }),

    isMobile() {
      let currentBreakpoint = this.mobileBreakpoints
      let currentBreakpoint = this.$vuetify.breakpoint.name
      let bool = currentBreakpoint.includes(currentBreakpoint)
      return bool
    },

  },

  methods: {},
}
</script>
