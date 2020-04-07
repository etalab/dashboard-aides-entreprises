console.log('+ + + plugins/utils... ')

import axios from 'axios'

// feature test for AbortController that works in Safari 12
let abortableFetchSupported = false;
try{
  const ac = new AbortController()
  fetch('.', {signal: ac.signal})
  .then(r => r.text())
  .then(result => {
    abortableFetchSupported = false;
  })
  .catch(err => {
    abortableFetchSupported = err.name === 'AbortError'
  })
  ac.abort();
}
catch(e){
  abortableFetchSupported = false;
}




// - - - - - - - - - - - - - - - - - - - //
// API CALLS 
// - - - - - - - - - - - - - - - - - - - //

export function getDataFromUrl( fetchUrl ){

  console.log("+ + + getDataFromUrl / fetchUrl : ", fetchUrl)

  let methodsWithPayload = [ "POST", "PUT", "PATCH" ]

  return axios({
    method : 'get',
    url : fetchUrl,
  })
  .then( resp => {
    console.log("+ + + getDataFromUrl / resp :", resp);
    return resp
  })
  .catch( err => {
    console.log("+ + + getDataFromUrl / (axios)  err :", err);
  })
}


// - - - - - - - - - - - - - - - - - - - //
// PURE UTILS
// - - - - - - - - - - - - - - - - - - - //

export function objectFromPath( obj, path, separator='/'){

  console.log("+ + + objectFromPath / path : ", path)
  let object

  if ( path ){

    var properties = Array.isArray(path) ? path : path.split(separator)
    console.log("+ + + objectFromPath / properties : ", properties)

    object = properties.reduce((prev, curr) => prev && prev[curr], obj)
    console.log("+ + + objectFromPath / object : ", object)

  } else {
    object = obj
  }

  return object
}