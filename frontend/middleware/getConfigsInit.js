import axios from "axios"

// POPULATE CONFIG IF STORE EMPTY
export default function ({ store, env }) {
  let log = store.state.log
  let configsAreSet = store.state.configs.configsAreSet

  let promisesArray = []

  log && console.log("\n", "+ ".repeat(20))
  log && console.log("-MW- getConfigInit ... ")

  if (!configsAreSet) {
    // begin to load config files
    log && console.log("-MW- getConfigInit / !configsAreSet ... ")

    let configsReferences = env.CONFIG_APP.configsReferences
    let configsFrom = env.CONFIG_APP.configsFrom
    store.commit("configs/setConfigsFrom", configsFrom)

    log &&
      console.log(
        "-MW- getConfigInit / configsReferences : ",
        configsReferences
      )
    log && console.log("-MW- getConfigInit / configsFrom : ", configsFrom)

    let getDistant = ["local_json_files", "distant_json_files"]

    // loop config urls
    for (let configRef of configsReferences) {
      log && console.log("-MW- getConfigInit / configRef.url : ", configRef.url)
      if (getDistant.includes(configsFrom)) {
        let initConfigFromURL = axios
          .get(configRef.url)
          .then((resp) => {
            log && console.log("-MW- getConfigInit / resp : ", resp)
            let configRefData = {
              field: configRef.field,
              data: resp.data,
            }
            store.commit("configs/setConfigField", configRefData)
          })
          .catch((err) => {
            log &&
              console.log(
                "-MW- getConfigInit / error - configRef.url : ",
                configRef.url
              )
            console.log(
              "-MW- getConfigInit / error while loading from configURL.url :",
              err
            )
          })
        promisesArray.push(initConfigFromURL)
      } else if (configsFrom == "local_js_files") {
        let initConfigFromJSfile = new Promise((resolve) => {
          let resp = configRef.data
          resolve(resp)
        })
          .then((resp) => {
            log && console.log("-MW- getConfigInit / resp : ", resp)
            let configRefData = {
              field: configRef.field,
              data: resp,
            }
            store.commit("configs/setConfigField", configRefData)
          })
          .catch((err) => {
            console.log(
              "-MW- getConfigInit / error while loading from configRef :",
              err
            )
          })
        promisesArray.push(initConfigFromJSfile)
      }
    }
  }

  // WAIT FOR ALL PROMISES TO RETURN
  log && console.log("\n")
  return Promise.all(promisesArray)
}
