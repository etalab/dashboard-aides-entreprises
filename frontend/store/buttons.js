export const state = () => ({
  triggerBtnChange: 1
})

export const getters = {}

export const mutations = {
  toggleBtnTrigger (state) {
    state.triggerBtnChange = state.triggerBtnChange * -1
  }
}

export const actions = {}
