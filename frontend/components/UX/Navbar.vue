""

<style scoped></style>

<template>
  <v-app-bar
    :clipped-left="clipped"
    :elevation="navbarUI.elevation"
    :class="`${navbarUI.navbarClass}`"
    fixed
    :color="navbarUI.color"
    :dark="navbarUI.dark"
    :height="navbarUX.height"
    app
  >
    <!-- DRAWER -->
    <v-app-bar-nav-icon
      v-if="drawerBtn"
      @click.stop="toogleNavbarItem('drawer')"
    />

    <!-- MINIVARIANT  -->
    <v-btn
      v-if="miniVariantBtn"
      icon
      @click.stop="toogleNavbarItem('miniVariant')"
    >
      <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
    </v-btn>

    <!-- CLIP BTN -->
    <v-btn v-if="clippedBtn" icon @click.stop="toogleNavbarItem('clipped')">
      <v-icon>mdi-application</v-icon>
    </v-btn>

    <!-- FIXED -->
    <v-btn v-if="fixedBtn" icon @click.stop="toogleNavbarItem('fixed')">
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <!-- NAVBAR TITLE -->
    <v-spacer />
    <v-toolbar-title :class="`${navbarUI.titleClass}`">
      {{ appTitle[locale] }}
    </v-toolbar-title>
    <v-spacer />

    <!-- RIGHT DRAWER -->
    <!-- <v-btn
      icon
      @click.stop="toogleNavbarItem('rightDrawer')"
      >
      <v-icon>mdi-menu</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "Navbar",

  components: {},

  props: [],

  data() {
    return {}
  },

  watch: {},

  mounted() {
    this.log && console.log("C-Navbar / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      appTitle: (state) => state.appTitle,

      navbarUI: (state) => state.configUI.navbar,
      navbarUX: (state) => state.navbar,

      clipped: (state) => state.navbar.clipped,
      clippedBtn: (state) => state.navbar.clippedBtn,

      drawer: (state) => state.navbar.drawer,
      drawerBtn: (state) => state.navbar.drawerBtn,

      fixed: (state) => state.navbar.fixed,
      fixedBtn: (state) => state.navbar.fixedBtn,

      miniVariant: (state) => state.navbar.miniVariant,
      miniVariantBtn: (state) => state.navbar.miniVariantBtn,

      right: (state) => state.navbar.right,
      rightBtn: (state) => state.navbar.rightBtn,

      rightDrawer: (state) => state.navbar.rightDrawer,
      rightDrawerBtn: (state) => state.navbar.rightDrawerBtn,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      windowSize: "getWindowsSize",
    }),
  },

  methods: {
    toogleNavbarItem(fieldName) {
      // this.log && console.log('C-Navbar / toogleNavbarItem : ', fieldName)
      this.$store.commit("setFromNavbar", fieldName)
    },
  },
}
</script>
