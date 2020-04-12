console.log('+ + + plugins/utils... ')

// - - - - - - - - - - - - - - - - - - - //
// PURE UTILS
// - - - - - - - - - - - - - - - - - - - //

// SELECTOR FUNCTIONS FROM ENV VAR
const trueStrings = ['yes', 'Yes', 'YES', 'y', 'Y', 'true', 'True', 'TRUE', 't', 'T']
const falseStrings = ['no', 'No', 'NO', 'n', 'N', 'false', 'False', 'FALSE', 'f', 'F']
const chooseBooleanMode = (ARG) => {
  if (trueStrings.includes(ARG)) {
    return true
  } else {
    return false
  }
}

// FIND FROM ARRAY
export function findElementFromArrayAndId( id, targetArray, idField='id') {
  // console.log("+ + + findElementFromArrayAndId / id : ", id)
  let filteredOut = targetArray.find( item => 
    item[idField] === id
  )
  return filteredOut
}


// RETRIEVE OBJECT FROM PATH
export default function objectFromPath( obj, path, separator='/'){

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



export function toMillionsOrElse (x, params={ divider:1000000, fixed:2 } ) { 
  // console.log( "=== toMillions / x ", x )
  return parseFloat( (parseFloat(x)/params.divider).toFixed( params.fixed ) ) 
}
export function toFloat (x, params=undefined) { 
  // console.log( "=== toFloat / x ", x )
  return parseFloat(x) 
}