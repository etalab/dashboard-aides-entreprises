<template>
  <div id="rawData">
    <hr>
    <br >

    <v-row>
      <v-col align-center>
        <div class="text-center">
          <code>activatedFilters</code>
        </div>
        <div class="text-center">
          <!-- <code> -->
          {{ activatedFilters }}
          <!-- </code> -->
        </div>
      </v-col>
    </v-row>
    <br >

    <hr >

    <v-row>
      <!-- INIT DATA -->
      <v-col>
        <div class="text-center">
loop in <code>state.data.initData</code>
</div>
        <br >

        <!-- {{ initData }} -->
        <div v-if="initData">
          <div v-for="(val, index) in initData" :key="index">
            <hr >
            <br >
            <p>
              id :
              <code>{{ val.id }}</code>
            </p>
            <div>
              <!-- <code> -->
              <!-- {{ val.data.slice(0,1) }} -->
              <!-- [ ... ] -->
              <!-- </code> -->
            </div>
            <br >
          </div>
        </div>
      </v-col>

      <!-- DISPLAYED DATA -->
      <v-col>
        <div class="text-center">
          loop in <code>state.data.displayedData</code>
        </div>
        <br >

        <!-- {{ displayedData }} -->
        <div v-if="displayedData">
          <div v-for="(val, index) in displayedData" :key="index">
            <hr >
            <br >
            <p>
              id : <br>
              <code>{{ val.id }}</code>
            </p>
            <div>
              <!-- <code> -->
              <!-- {{ val.data.slice(0,1) }} -->
              <!-- [ ... ] -->
              <!-- </code> -->
            </div>
            <br >
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
  name: "PageRawData",

  components: {},

  props: [],

  data() {
    return {}
  },

  watch: {},

  mounted() {
    this.log && console.log("P-PageRawData / mounted ...")
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      locale: (state) => state.locale,

      backendApi: (state) => state.data.backendApi,

      activatedFilters: (state) => state.data.activatedFilters,

      initData: (state) => state.data.initData,
      displayedData: (state) => state.data.displayedData,
    }),

    ...mapGetters({
      getCurrentLocale: "getCurrentLocale",
      // activatedFilters : 'data/getActivatedFilters',
    }),
  },

  methods: {},
}
</script>
