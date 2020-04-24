import Vue from "vue"
import VueMatomo from "vue-matomo"

export default ({ app }) => {
  Vue.use(VueMatomo, {
    host: "https://stats.data.gouv.fr",
    siteId: 127,
    router: app.router,
  })
}
