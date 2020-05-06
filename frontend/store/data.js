import {
  objectFromPath,
  sortArrayBy,
  moveArrayElement,
  switchFormatFunctions
} from '~/utils/utils.js'

export const state = () => ({
  // GLOABAL APP ENV
  log: process.env.LOG,
  mode: process.env.CONFIG_APP.mode,

  // API BACKEND
  // backendApi: process.env.CONFIG_APP.backendApi,
  // dataSource: process.env.CONFIG_APP.dataSource,
  // defaultDataSetup: process.env.CONFIG_APP.defaultDataSetup,
  backendApi: undefined,
  dataSource: undefined,
  defaultDataSetup: undefined,

  // FILTERS
  // filters: process.env.CONFIG_APP.filters,
  filters: undefined,
  activatedFilters: [],

  // DATASETS
  initData: undefined,
  isInitDataSet: false,

  // QUERY
  query: undefined,
  response: undefined,

  // DISPLAYED DATA
  displayedData: undefined,
  specialStore: {},
  triggerChange: 1
})

export const getters = {
  // BACKEND
  chooseBackend: (state) => {
    const mode = state.mode
    return state.dataSource.apiBackendUrl[mode]
  },

  getBackendApi: (state) => {
    return state.backendApi
  },

  // FILTERS

  getActivatedFilters: (state) => {
    return state.activatedFilters
  },

  // DATASETS

  getFromInitData: (state) => (id) => {
    // state.log && console.log("S-data-G-getFromInitData ... state.initData : ", state.initData)
    // state.initData.forEach( d => {
    //   state.log && console.log("S-data-G-getFromInitData ... d.id : ", d.id)
    // })
    return state.initData.find((dataset) => dataset.id === id)
  },

  getFromDisplayedData: (state) => (id) => {
    // state.log && console.log("S-data-G-getFromDisplayedData ... state.displayedData : ", state.displayedData)
    // state.displayedData.forEach( d => {
    //   state.log && console.log("S-data-G-getFromDisplayedData ... d.id : ", d.id)
    // })
    return (
      state.displayedData &&
      state.displayedData.find((dataset) => dataset.id === id)
    )
  },

  getFromSpecialStore: (state) => (id) => {
    return state.specialStore.find((dataset) => dataset.id === id)
  },

  selectFromDisplayedData: (state, getters) => (paramsArray) => {
    // state.log && console.log("S-data-A-selectFromDisplayedData / paramsArray  : ", paramsArray )
    const resultsArray = []
    for (const params of paramsArray) {
      const dataset = getters.getFromDisplayedData(params.id)
      // state.log && console.log("S-data-A-selectFromDisplayedData / dataset  : ", dataset )
      const result = dataset && objectFromPath(dataset.data, params.field)
      resultsArray.push(result)
    }
    return resultsArray
  },

  getSpecialStore: (state) => {
    return state.specialStore
  },

  getFromSpecialStoreData: (state) => (params) => {
    // state.log && console.log("S-data-A-getFromSpecialStoreData / params  : ", params )
    let obj = state.specialStore[params.id]
    obj = params.key ? obj[params.key] : params.key

    const sortParams = params.sortParams
    if (sortParams) {
      const clone = []
      // state.log && console.log("S-data-A-getFromSpecialStoreData / obj  : ", obj )
      for (const i of obj) {
        clone.push(i)
      }
      // state.log && console.log("S-data-A-getFromSpecialStoreData / clone  : ", clone )
      // state.log && console.log("S-data-A-getFromSpecialStoreData / sortParams  : ", sortParams )
      let sorted = sortArrayBy(clone, sortParams)
      if (sortParams.sortOrder === 'descending') {
        sorted = sorted.reverse()
      }
      const excParams = sortParams.exceptions
      if (excParams) {
        const arrayMaxIndex = sorted.length - 1
        if (excParams.putLast) {
          const itemToMoveIndexLast = sorted.findIndex(
            (i) => i[excParams.putLast.fieldName] === excParams.putLast.value
          )
          sorted = moveArrayElement(sorted, itemToMoveIndexLast, arrayMaxIndex)
        }
        if (sortParams.putFirst) {
          const itemToMoveIndexFirst = sorted.findIndex(
            (i) => i[excParams.putFirst.fieldName] === excParams.putFirst.value
          )
          sorted = moveArrayElement(sorted, itemToMoveIndexFirst, 0)
        }
      }
      obj = sorted
    }
    return obj
  },

  getStoreSourceData: (state, getters) => (params) => {
    let data

    // get data from store
    const fromId = params.fromDatasetId
    if (params.fromStoreData === 'initData') {
      data = getters.getFromInitData(fromId).data
    }
    if (params.fromStoreData === 'displayeData') {
      data = getters.getFromDisplayedData(fromId).data
    }
    // state.log && console.log("S-data-G-getStoreSourceData ... data (1) : ", data)

    // filter out from params
    const itemKey = params.fromPropKey
      ? params.props[params.fromPropKey]
      : params.fromPropValue
    // state.log && console.log("S-data-G-getStoreSourceData ... itemKey : ", itemKey)

    const fromDatasetKey = params.fromDatasetKey
    // state.log && console.log("S-data-G-getStoreSourceData ... fromDatasetKey : ", fromDatasetKey )

    const fromDatasetIndex = params.fromDatasetIndex
    // state.log && console.log("S-data-G-getStoreSourceData ... fromDatasetIndex : ", fromDatasetIndex )

    if (Array.isArray(data)) {
      if (fromDatasetKey) {
        data = data.find((i) => i[fromDatasetKey] === itemKey)
      }
      if (typeof fromDatasetIndex !== 'undefined') {
        data = data[fromDatasetIndex]
      }
      // state.log && console.log("S-data-G-getStoreSourceData ... data (2a) : ", data)
    } else {
      data = fromDatasetKey ? data[fromDatasetKey] : data
      // state.log && console.log("S-data-G-getStoreSourceData ... data (2a) : ", data)
      data = data[itemKey]
      // state.log && console.log("S-data-G-getStoreSourceData ... data (2b) : ", data)
    }

    // state.log && console.log("S-data-G-getStoreSourceData ... data (3) : ", data)

    // retrieve correct field
    const fromDatasetField = params.fromDatasetField
    data = data && fromDatasetField ? data[fromDatasetField] : data
    // state.log && console.log("S-data-G-getStoreSourceData ... data (4) : ", data)

    return data
  }
}

export const mutations = {
  setConfigData (state, configData) {
    state.log &&
      console.log('S-data-M-setConfigData / configData  : ', configData)
    state.dataSource = configData.dataSource
    state.defaultDataSetup = configData.defaultDataSetup
    state.filters = configData.filters
  },
  setConfigBackendUrl (state, backendApi) {
    state.log &&
      console.log('S-data-M-setConfigBackendUrl / backendApi  : ', backendApi)
    state.backendApi = backendApi
  },

  setInitDataAsSet (state) {
    state.isInitDataSet = !state.isInitDataSet
  },

  // DATASETS

  pushToInitData (state, dataset) {
    if (!state.initData) {
      state.initData = []
    }
    state.initData.push(dataset)
  },

  pushToDisplayedData (state, dataset) {
    if (!state.displayedData) {
      state.displayedData = []
    }
    state.displayedData.push(dataset)
  },

  setInitDataset (state, dataset) {
    // state.log && console.log("S-data-M-setInitDataset / dataset.id  : ", dataset.id )
    const foundIndex = state.initData.findIndex((x) => x.id === dataset.id)
    state.initData[foundIndex] = dataset
  },

  setDisplayedDataset (state, dataset) {
    // state.log && console.log("S-data-M-setDisplayedDataset / dataset.id  : ", dataset.id )
    const foundIndex = state.displayedData.findIndex((x) => x.id === dataset.id)
    state.displayedData[foundIndex] = dataset
  },

  toggleTrigger (state) {
    state.triggerChange = state.triggerChange * -1
  },

  setDeepNestedData (state, targetData) {
    // state.log && console.log("S-data-M-setDeepNestedData / targetData  : ", targetData )
    state.specialStore[targetData.specialStoreId] = targetData.value
  },

  // FILTERS

  resetFilters (state) {
    // state.log && console.log("S-data-M-resetFilters ...")
    state.activatedFilters = []
  },

  setActivatedFilters (state, selectedFilters) {
    // state.log && console.log("S-data-M-setActivatedFilters / selectedFilters :", selectedFilters)
    state.activatedFilters = selectedFilters
  }
}

export const actions = {
  setUpConfigData ({ state, commit, getters, rootGetters }) {
    state.log && console.log('\n', '- '.repeat(20))
    state.log && console.log('S-data-A-setUpConfigData / ... ')

    const configData = rootGetters['configs/getConfigField']('configAppData')
    state.log &&
      console.log('S-data-A-setUpConfigData / configData :', configData)
    commit('setConfigData', configData)

    const backendUrl = getters.chooseBackend
    commit('setConfigBackendUrl', backendUrl)
  },

  // DATASETS

  setDisplayedDataset ({ getters, commit }, updatedDataset) {
    // state.log && console.log("S-data-A-setDisplayedDataset / updatedDataset.id  : ", updatedDataset.id )

    // check if dataset exists in displayedData
    const dataset = getters.getFromDisplayedData(updatedDataset.id)
    // state.log && console.log("S-data-A-setDisplayedDataset / dataset : ", dataset)

    if (typeof dataset !== 'undefined') {
      commit('setDisplayedDataset', updatedDataset)
    } else {
      commit('pushToDisplayedData', updatedDataset)
    }
  },

  setNestedData ({ commit }, targetData) {
    // state.log && console.log("S-data-A-setNestedData / targetData  : ", targetData )
    // state.log && console.log("S-data-A-setNestedData / getters.getSpecialStore (1) : ", getters.getSpecialStore )
    commit('setDeepNestedData', targetData)
    // state.log && console.log("S-data-A-setNestedData / getters.getSpecialStore (2) : ", getters.getSpecialStore )
  },

  getDataFromSpecialStoreData ({ getters }, params) {
    return getters.getFromSpecialStoreData(params)
  },

  resetStore ({ getters, commit, dispatch }, params) {
    // state.log && console.log("\nS-data-A-resetStore / params :", params)

    for (const targetParams of params.targets) {
      // state.log && console.log("S-data-A-resetStore / targetParams :", targetParams)

      let value = getters.getStoreSourceData(targetParams)
      // state.log && console.log("S-data-A-resetStore / value :", value)

      if (targetParams.format) {
        value = switchFormatFunctions(value, targetParams.format)
      }

      const targetData = {
        value: value,
        specialStoreId: targetParams.targetSpecialStoreId
      }
      // state.log && console.log("S-data-A-resetStore / targetData :", targetData)
      dispatch('setNestedData', targetData) // set element in : store.data.sepcialStore
    }

    commit('toggleTrigger')
  },

  // QUERIES

  search ({ state }) {
    // TO DO
    state.log && console.log('S-data-A-search / ... ')
  },

  // FILTERS

  toggleFilters ({ state, commit, dispatch, getters }, filterTag) {
    state.log &&
      console.log('\nS-data-A-getActivatedFilters / filterTag :', filterTag)

    const currentFilters = getters.getActivatedFilters.map((a) => a)
    state.log &&
      console.log('S-data-A-toggleFilters / currentFilters A :', currentFilters)

    // find item by FilterCode +
    var removeIndex = currentFilters
      .map(function (item) {
        return item.filterIdx
      })
      .indexOf(filterTag.filterIdx)
    state.log &&
      console.log('S-data-A-toggleFilters / removeIndex :', removeIndex)

    if (removeIndex !== -1) {
      currentFilters.splice(removeIndex, 1)
    } else {
      currentFilters.push(filterTag)
    }

    state.log &&
      console.log('S-data-A-toggleFilters / currentFilters B :', currentFilters)
    commit('setActivatedFilters', currentFilters)

    // update query and search
    dispatch('search')
  },

  clearFilters ({ commit, dispatch }) {
    // state.log && console.log("S-data-A-clearFilters / filterItem :", filterItem)
    commit('resetFilters')
    dispatch('search')
  }
}
