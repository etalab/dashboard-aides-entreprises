import axios from 'axios'

// POPULATE CONFIG IF STORE EMPTY
export default function ({ store, env }) {
  const log = store.state.log
  const configsAreSet = store.state.configs.configsAreSet

  const promisesArray = []

  // log && console.log('\n', '+ '.repeat(20))
  // log && console.log('-MW- getConfigInit ... ')

  if (!configsAreSet) {
    // begin to load config files
    // log && console.log('-MW- getConfigInit / !configsAreSet ... ')

    const configsReferences = env.CONFIG_APP.configsReferences
    const configsFrom = env.CONFIG_APP.configsFrom
    store.commit('configs/setConfigsFrom', configsFrom)

    // log &&
    //   console.log(
    //     '-MW- getConfigInit / configsReferences : ',
    //     configsReferences
    //   )
    // log && console.log('-MW- getConfigInit / configsFrom : ', configsFrom)

    const getDistant = ['local_json_files', 'distant_json_files']

    // loop config urls
    for (const configRef of configsReferences) {
      if (getDistant.includes(configsFrom)) {
        // log &&
        //   console.log('-MW- getConfigInit / configRef.url : ', configRef.url)
        const initConfigFromURL = axios
          .get(configRef.url)
          .then((resp) => {
            // log && console.log("-MW- getConfigInit / resp : ", resp)
            const configRefData = {
              field: configRef.field,
              data: resp.data
            }
            store.commit('configs/setConfigField', configRefData)
          })
          .catch((err) => {
            log &&
              console.log(
                '-MW- getConfigInit / error - configRef.url : ',
                configRef.url
              )
            console.log(
              '-MW- getConfigInit / error while loading from configURL.url :',
              err
            )
          })
        promisesArray.push(initConfigFromURL)
      } else if (configsFrom === 'local_js_files') {
        // log && console.log('-MW- getConfigInit / configRef.data.help : ', configRef.data.help)
        const initConfigFromJSfile = new Promise((resolve) => {
          const resp = configRef.data
          resolve(resp)
        })
          .then((resp) => {
            // log && console.log("-MW- getConfigInit / resp : ", resp)
            const configRefData = {
              field: configRef.field,
              data: resp
            }
            store.commit('configs/setConfigField', configRefData)
          })
          .catch((err) => {
            console.log(
              '-MW- getConfigInit / error while loading from configRef :',
              err
            )
          })
        promisesArray.push(initConfigFromJSfile)
      }
    }
  }

  // WAIT FOR ALL PROMISES TO RETURN
  // log && console.log('\n')
  return Promise.all(promisesArray)
}
