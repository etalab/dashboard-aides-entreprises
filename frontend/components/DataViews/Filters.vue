<style scoped></style>

<template>
  <v-toolbar
    v-show="canShow"
    v-if="filtersUX.isVisible"
    :elevation="filtersUI.elevation"
    dense
    :fixed="true"
    :class="``"
    :trigger="`${trigger}`"
  >
    <v-spacer />

    <div class="text-center">
      <!-- LOOP FILTERS -->
      <v-menu v-for="(filter, index) in filters" :key="index" offset-y>
        <!-- DROPDOWN MENU -->
        <template v-slot:activator="{ on }">
          <v-btn color="primary" text v-on="on">
            {{ filter.name[locale] }}
            <v-icon> mdi-menu-down </v-icon>
          </v-btn>
        </template>

        <!-- MENU OPTIONS -->
        <v-list>
          <v-list-item
            v-for="(filterItem, i) in filter.options"
            :key="i"
            @click="updateActivatedFilters(filter, filterItem)"
          >
            <v-list-item-title>
              {{ filterItem.label[locale] }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-spacer />
  </v-toolbar>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "Filters",

  components: {},

  props: [],

  data() {
    return {}
  },

  watch: {},

  mounted() {
    this.log && console.log("C-Filters / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,
      trigger: (state) => state.data.triggerChange,

      filters: (state) => state.data.filters,
      filtersUX: (state) => state.configUX.filters,
      filtersUI: (state) => state.configUI.filters,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      getSpecialStore: "data/getSpecialStore",
      windowSize: "getWindowsSize",
      getCurrentBreakpoint: "getCurrentBreakpoint",
    }),

    canShow() {
      let bool = true
      let noShowArray = this.viewConfig && this.viewConfig.notShowFor
      if (noShowArray) {
        let bool = noShowArray.includes(this.getCurrentBreakpoint)
      }
      return bool
    },
  },

  methods: {
    updateActivatedFilters(filter, filterItem) {
      // this.log && console.log('C-Filters / updateActivatedFilters / filterItem : ', filterItem)

      let filterTag = {
        filterCode: filter.filterCode,
        optionValue: filterItem.value,
        filterIdx: "c-" + filter.filterCode + "/o-" + filterItem.value,
      }

      this.$store.dispatch("data/toggleFilters", filterTag)
    },
  },
}
</script>
