<template>
  <div id="table">
    <v-layout
      column
      justify-center
      align-center
      -table
    />
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

import Table from "~/components/DataViews/Table.vue"

export default {
  name: "PageTable",

  components: {
    Table,
  },

  props: [],

  data() {
    return {}
  },

    watch: {
    },

    mounted(){
      this.log && console.log('P-PageTable / mounted ...')
    },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,

      backendApi: (state) => state.data.backendApi,
      filters: (state) => state.data.filters,

      initData: (state) => state.data.initData,
      data: (state) => state.data.displayedData,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
    }),
  },

  methods: {},
}
</script>
