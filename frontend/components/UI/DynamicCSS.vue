<template>
  <div id="dynamic-css">
    <style v-for="(css, index) in configCSS" :key="index" type="text/css">
      {{ css.class }} {
      {{ css.config }}
      }
    </style>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  components: {},

  data() {
    return {}
  },

  beforeMount() {
    // this.log && console.log('\nC-DynamicCSS.vue / beforeMount...')
  },

  mounted() {
    this.log && console.log("C-DynamicCSS.vue / mounted...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,

      configCSS: (state) => state.configUI.customCSS,
    }),

    ...mapGetters({
      locale: "getCurrentLocale",
    }),
  },

  methods: {},
}
</script>
