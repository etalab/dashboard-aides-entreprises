import Vue from "vue"
import VueMatomo from "vue-matomo"

Vue.use(VueMatomo, {
  host: "https://stats.data.gouv.fr",
  siteId: 127,
})
