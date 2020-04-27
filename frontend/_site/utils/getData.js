console.log("+ + + utils/getData.js... ")

import axios from "axios"

// - - - - - - - - - - - - - - - - - - - //
// API UTILS
// - - - - - - - - - - - - - - - - - - - //

// feature test for AbortController that works in Safari 12
let abortableFetchSupported = false
try {
  const ac = new AbortController()
  fetch(".", { signal: ac.signal })
    .then((r) => r.text())
    .then((result) => {
      abortableFetchSupported = false
    })
    .catch((err) => {
      abortableFetchSupported = err.name === "AbortError"
    })
  ac.abort()
} catch (e) {
  abortableFetchSupported = false
}

// - - - - - - - - - - - - - - - - - - - //
// API CALLS
// - - - - - - - - - - - - - - - - - - - //

export default async function getDataFromUrl(fetchUrl, fetchMethod = "get") {
  console.log("+ + + getDataFromUrl / fetchUrl : ", fetchUrl)

  let methodsWithPayload = ["post", "put", "patch"]

  return axios({
    method: fetchMethod,
    url: fetchUrl,
  })
    .then((resp) => {
      console.log("+ + + getDataFromUrl / resp :", resp)
      return resp
    })

    .catch((err) => {
      console.log("+ + + getDataFromUrl / (axios) err / fetchUrl :", fetchUrl)
      console.log("+ + + getDataFromUrl / (axios) err :", err)
      return { data: "error" }
    })
}
