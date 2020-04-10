console.log('+ + + plugins/utils... ')

// - - - - - - - - - - - - - - - - - - - //
// PURE UTILS
// - - - - - - - - - - - - - - - - - - - //


export function findElementFromArrayAndId( id, targetArray, idField='id') {
  
  console.log("+ + + findElementFromArrayAndId / id : ", id)

  let filteredOut = targetArray.find( item => 
    item[idField] === id
  )
  return filteredOut

}

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