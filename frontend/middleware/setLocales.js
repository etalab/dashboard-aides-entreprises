export default function ({ req, store, app, redirect }) {
  const log = store.state.log
  log && console.log('\n', '+ '.repeat(20))
  log && console.log('-MW- setLocales...')
  const hasLocales = store.state.locales

  if (!hasLocales) {
    // let localesObj = process.env.CONFIG_APP.localesBuild
    // log && console.log('-MW- setLocales / localesObj : ', localesObj)

    // let defaultLocaleIso = process.env.CONFIG_APP.defaultLocale
    // log && console.log('-MW- setLocales / defaultLocaleIso : ', defaultLocaleIso)

    store.commit('initLocales')
  }
}
