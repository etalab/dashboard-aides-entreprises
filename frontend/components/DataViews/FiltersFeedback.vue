<style scoped></style>

<template>
  <v-toolbar :elevation="filtersUI.elevation" dense :fixed="true" :class="``">
    <v-spacer />

    <div class="text-center">
      <!-- LOOP FILTERS -->
      {{ activatedFilters }}
    </div>

    <v-spacer />
  </v-toolbar>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "FiltersFeedback",

  components: {},

  props: [],

  data() {
    return {}
  },

  watch: {},

  mounted() {
    this.log && console.log("C-FiltersFeedback / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,

      activatedFilters: (state) => state.data.activatedFilters,
      filtersUI: (state) => state.configUI.filters,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      windowSize: "getWindowsSize",
    }),
  },

  methods: {},
}
</script>
