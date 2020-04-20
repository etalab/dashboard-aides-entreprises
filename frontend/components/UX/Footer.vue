<style scoped></style>

<template>
  <v-footer :fixed="fixed" app class="text-center">
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "Footer",

  components: {},

  props: [],

  data() {
    return {}
  },

  watch: {},

  mounted() {
    this.log && console.log("C-Footer / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,

      fixed: (state) => state.navbar.fixed,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
    }),
  },

  methods: {},
}
</script>
