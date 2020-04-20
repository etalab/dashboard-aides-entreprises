export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect,
}) {
  console.log("\n-MW-i18n ...")

  const defaultLocale = app.i18n.fallbackLocale

  let currrentLocale = store.getters["getCurrentLocale"]

  // If middleware is called from hot module replacement, ignore it

  console.log("-MW-i18n / params.lang : ", params.lang)
  console.log("-MW-i18n / defaultLocale : ", defaultLocale)
  console.log("-MW-i18n / currrentLocale : ", currrentLocale)

  console.log("-MW-i18n / store.state.locales : \n", store.state.locales)

  if (isHMR) return

  // Get locale from params or else
  const locale = params.lang || currrentLocale || defaultLocale
  console.log("-MW-i18n / locale : ", locale)

  if (
    !store.state.locales.find((loc) => {
      return loc.code === locale
    })
  ) {
    return error({ message: "This page could not be found.", statusCode: 404 })
  }

  // Set locale
  let localeObj = store.state.locales.find((loc) => loc.code === locale)
  store.commit("switchLocale", localeObj)

  console.log("-MW-i18n / app.i18n.locale A : ", app.i18n.locale)
  app.i18n.locale = locale
  console.log("-MW-i18n / app.i18n.locale B : ", app.i18n.locale)

  // If route is /<defaultLocale>/... -> redirect to /...
  if (
    locale === defaultLocale &&
    route.fullPath.indexOf("/" + defaultLocale) === 0
  ) {
    const toReplace =
      "^/" +
      defaultLocale +
      (route.fullPath.indexOf("/" + defaultLocale + "/") === 0 ? "/" : "")
    const re = new RegExp(toReplace)
    return redirect(route.fullPath.replace(re, "/"))
  }
}
