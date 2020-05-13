// import { objectFromPath, sortArrayBy, moveArrayElement } from '~/utils/utils.js'

export const state = () => ({
  // GLOABAL APP ENV
  log: process.env.LOG,

  mapHeight: undefined,
  showLoader: true,

  resetZoomTrigger: -1,

  // ZOOM & CENTER
  map: undefined,
  originalCenter: undefined,
  originalZoom: undefined,
  currentZoom: undefined,

  fitToPolygon: undefined,

  mapOptions: {
    mapStyle: undefined,
    zoom: undefined,
    maxZoom: undefined,
    minZoom: undefined,
    currentZoom: undefined,
    center: undefined,
    currentCenter: undefined
  },

  mapsVisibility: undefined,
  drawerMapsOpen: undefined,

  // LAYERS & SOURCES
  sources: undefined,

  maps: undefined,
  layers: undefined,

  // UX
  hoveredStateId: {},
  selectedStateId: {}

})

export const getters = {
  // RESET ZOOM TRIGGER

  getResetZoomTrigger: (state, getters) => {
    return state.resetZoomTrigger
  }
}

export const mutations = {
  // GENERAL SETTER
  setStateObject (state, fieldAndValue) {
    state[fieldAndValue.field] = fieldAndValue.value
  },

  // UPDATE ZOOM TRIGGER
  setResetZoomTrigger (state) {
    // state.log && console.log("\nS-map-M-setResetZoomTrigger ... ")
    state.resetZoomTrigger = state.resetZoomTrigger * -1
  },
  setFitToPolygon (state, polygonParams) {
    state.fitToPolygon = polygonParams
  },

  // UPDATE SELECTED
  seSelectedStateId (state, selectedStateId) {
    state.selectedStateId = selectedStateId
  }

}

export const actions = {
  triggerResetZoom ({ state, commit }, params) {
    // state.log && console.log("\nS-map-A-triggerResetZoom / params :", params)
    commit('setResetZoomTrigger')
  }
}
