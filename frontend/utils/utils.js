console.log('+ + + utils/utils... ')

// PURE UTILS


// - - - - - - - - - - - - - - - - - - - //
// SELECTOR FUNCTIONS FROM ENV VAR
// - - - - - - - - - - - - - - - - - - - //

const trueStrings = ['yes', 'Yes', 'YES', 'y', 'Y', 'true', 'True', 'TRUE', 't', 'T']
const falseStrings = ['no', 'No', 'NO', 'n', 'N', 'false', 'False', 'FALSE', 'f', 'F']
const chooseBooleanMode = (ARG) => {
  if (trueStrings.includes(ARG)) {
    return true
  } else {
    return false
  }
}

// - - - - - - - - - - - - - - - - - - - //
// FIND FROM ARRAY
// - - - - - - - - - - - - - - - - - - - //

export function findElementFromArrayAndId( id, targetArray, idField='id') {
  // console.log("+ + + findElementFromArrayAndId / id : ", id)
  let filteredOut = targetArray.find( item => 
    item[idField] === id
  )
  return filteredOut
}


// - - - - - - - - - - - - - - - - - - - //
// RETRIEVE OBJECT FROM PATH
// - - - - - - - - - - - - - - - - - - - //

export function objectFromPath( obj, path, separator='.'){
  // console.log("\n+ + + objectFromPath / obj : ", obj)
  // console.log("+ + + objectFromPath / path : ", path)
  let object
  if ( path ){
    var properties = Array.isArray(path) ? path : path.split(separator)
    // console.log("+ + + objectFromPath / properties : ", properties)
    object = properties.reduce((prev, curr) => prev && prev[curr], obj)
    // console.log("+ + + objectFromPath / object : ", object)
  } else {
    object = obj
  }
  return object
}

export function setNestedObjectFromPath( path, value, obj, separator='.'){
  
  // console.log("\n+ + + setNestedObjectFromPath / obj : ", obj)
  // console.log("+ + + setNestedObjectFromPath / path : ", path)

  // from : https://medium.com/data-scraper-tips-tricks/safely-read-write-in-deeply-nested-objects-js-a1d9ddd168c6
  // this is a super simple parsing, you will want to make this more complex to handle correctly any path
  // it will split by the dots at first and then simply pass along the array (on next iterations)
  let properties = Array.isArray(path) ? path : path.split( separator )

  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    // The property doesn't exists OR is not an object (and so we overwritte it) so we create it
    if (!obj.hasOwnProperty(properties[0]) || typeof obj[properties[0]] !== "object") obj[properties[0]] = {}
      // We iterate.
    return setNestedObjectFromPath(properties.slice(1), value, obj[properties[0]])
      // This is the last property - the one where to set the value
  } else {
    // We set the value to the last property
    obj[properties[0]] = value
    return true // this is the end
  }
}

// - - - - - - - - - - - - - - - - - - - //
// FORMAT VALUES
// - - - - - - - - - - - - - - - - - - - //

export function toMillionsOrElse (x, params={ divider:1000000, fixed:2 } ) { 
  // console.log( "=== toMillions / x ", x )
  return parseFloat( (parseFloat(x)/params.divider).toFixed( params.fixed ) ) 
}

export function toFloat (x, params=undefined) { 
  // console.log( "=== toFloat / x ", x )
  return parseFloat(x) 
}

export function switchFormatFunctions ( value, format) {
  format.forEach( fn => {
    switch( fn.utilsFnName ){
      case 'toMillionsOrElse' : value = toMillionsOrElse( value, fn.params  ); break; 
      case 'toFloat'          : value = toFloat( value, fn.params  ); break; 
    }
  })
  return value
}