export default function ({ store }) {
  let log = store.state.log
  log && console.log("\n-MW- setConfigsInit ... ")

  let configsAreSet = store.state.configs.configsAreSet

  let configs = store.state.configs
  log && console.log("-MW- setConfigsInit / configs : ", configs)

  if (!configsAreSet) {
    store.dispatch("configs/setRootConfigs")
  }
}
