import Vue from "vue"
import VueMatomo from "vue-matomo"

export default ({ app, env }) => {
  Vue.use(VueMatomo, {
    host: env.CONFIG_APP.matomo_host,
    siteId: env.CONFIG_APP.matomo_siteId,
    router: app.router,
  })
}
