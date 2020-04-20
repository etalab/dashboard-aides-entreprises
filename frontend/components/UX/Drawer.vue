<template>
  <v-navigation-drawer
    v-model="drawerLocal"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <v-list>
      <div v-for="(item, i) in items">
        <v-list-item v-if="item.isVisible" :key="i" :to="item.to" router exact>
          <!-- ICON -->
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>

          <!-- TEXTE -->
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.i18nTitle)" />
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "Drawer",

  components: {},

  props: [],

  data() {
    return {
      drawerLocal: undefined,
    }
  },

  watch: {
    drawer(next, prev) {
      this.drawerLocal = next
    },
  },

  beforeMount() {
    this.log && console.log("C-Drawer / beforeMount ...")
    this.drawerLocal = this.drawer
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      appTitle: (state) => state.appTitle,

      items: (state) => state.navbar.items,

      clipped: (state) => state.navbar.clipped,
      drawer: (state) => state.navbar.drawer,
      fixed: (state) => state.navbar.fixed,
      miniVariant: (state) => state.navbar.miniVariant,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
    }),
  },

  methods: {},
}
</script>
