export default function ({ store, app }) {
  const log = store.state.log
  const promisesArray = []
  // log && console.log('\n', '+ '.repeat(20))
  // log && console.log('-MW- setConfigsInit ... ')

  // log && console.log('-MW- setConfigsInit ... / app :', app)

  // const vuetifyTheme = app.vuetify.theme
  // log && console.log('-MW- setConfigsInit ... / vuetifyTheme :', vuetifyTheme)

  const configsAreSet = store.state.configs.configsAreSet

  const configs = store.state.configs
  // log && console.log('-MW- setConfigsInit / configs : ', configs)

  if (!configsAreSet) {
    const setConfigsPromise = new Promise((resolve) => {
      resolve(store.dispatch('configs/setRootConfigs'))
    })
      .then((resp) => {
        // log && console.log('-MW- setConfigsInit / resp : ', resp)
      })
      .catch((err) => {
        console.log('-MW- getConfigInit / error while loading from configRef :', err)
      })
    promisesArray.push(setConfigsPromise)
  }
  return Promise.all(promisesArray)
}
