export default function ({ store, app }) {
  let log = store.state.log
  let promisesArray = []
  log && console.log("\n", "+ ".repeat(20))
  log && console.log("-MW- setConfigsInit ... ")

  log && console.log("-MW- setConfigsInit ... / app :", app)

  let vuetifyTheme = app.vuetify.theme
  log && console.log("-MW- setConfigsInit ... / vuetifyTheme :", vuetifyTheme)

  let configsAreSet = store.state.configs.configsAreSet

  let configs = store.state.configs
  log && console.log("-MW- setConfigsInit / configs : ", configs)

  if (!configsAreSet) {
    let setConfigsPromise = new Promise((resolve) => {
      resolve(store.dispatch("configs/setRootConfigs"))
    })
      .then((resp) => {
        log && console.log("-MW- setConfigsInit / resp : ", resp)
      })
      .catch((err) => {
        console.log(
          "-MW- getConfigInit / error while loading from configRef :",
          err
        )
      })
    promisesArray.push(setConfigsPromise)
  }
  return Promise.all(promisesArray)
}
