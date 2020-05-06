// ... all fontawesome icons ...
import Vue from 'vue'
import Vuetify from 'vuetify'

import '@fortawesome/fontawesome-free/css/all.min.css'
Vue.use(Vuetify, {
  iconfont: 'fa'
})

/*
// ... only some icons
// cf : https://stackoverflow.com/questions/52030435/fontawesome-with-vuetify-how-to-include-font-awesome-icons-within-the-v-icon-c

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // Integration
// import {
//   faHome,
//   faMap,
//   faTh,
//   faChartBar,
//   faDatabase
// } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
// library.add(
//   faHome,
//   faMap,
//   faTh,
//   faChartBar,
//   faDatabase
// )
library.add(fas)

Vue.use(Vuetify, {
  iconfont: 'faSvg'
})
*/
