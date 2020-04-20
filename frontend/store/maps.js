import { objectFromPath, sortArrayBy, moveArrayElement } from "~/utils/utils.js"

export const state = () => ({
  // GLOABAL APP ENV
  log: process.env.LOG,

  // ZOOM

  resetZoomTrigger: -1,
})

export const getters = {
  // RESET ZOOM TRIGGER

  getResetZoomTrigger: (state, getters) => {
    return state.resetZoomTrigger
  },
}

export const mutations = {
  // UPDATE ZOOM TRIGGER

  setResetZoomTrigger(state) {
    // state.log && console.log("\nS-map-M-setResetZoomTrigger ... ")
    state.resetZoomTrigger = state.resetZoomTrigger * -1
  },
}

export const actions = {
  triggerResetZoom({ state, commit }, params) {
    // state.log && console.log("\nS-map-A-triggerResetZoom / params :", params)
    commit("setResetZoomTrigger")
  },
}
