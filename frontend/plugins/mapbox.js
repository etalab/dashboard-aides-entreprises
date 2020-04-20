console.log("+ + + plugins/mapbox... ")

import Vue from "vue"
import {
  MglMap,
  MglMarker,
  MglPopup,
  MglGeolocateControl,
  MglNavigationControl,
  MglScaleControl,
  MglGeojsonLayer,
} from "vue-mapbox"
import Mapbox from "mapbox-gl"

Vue.component("MglMap", MglMap)

Vue.component("MglMarker", MglMarker)
Vue.component("MglPopup", MglPopup)

Vue.component("MglGeolocateControl", MglGeolocateControl)
Vue.component("MglNavigationControl", MglNavigationControl)
Vue.component("MglScaleControl", MglScaleControl)

Vue.component("MglGeojsonLayer", MglGeojsonLayer)

Vue.prototype.$mapbox = Mapbox
