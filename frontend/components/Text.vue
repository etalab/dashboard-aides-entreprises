<style scoped></style>

<template>
  <div />
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "Text",

  components: {},

  props: [],

  data() {
    return {
      fixed: false,
    }
  },

  watch: {},

  mounted() {
    this.log && console.log("C-Text / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
    }),
  },

  methods: {},
}
</script>
