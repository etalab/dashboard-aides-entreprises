console.log('+ + + plugins/utils... ')

// - - - - - - - - - - - - - - - - - - - //
// PURE UTILS
// - - - - - - - - - - - - - - - - - - - //

// export function addOrRemove(array, value) {

//   var index = array.indexOf(value);
//   if (index === -1) {
//       array.push(value);
//   } else {
//       array.splice(index, 1);
//   }
// }




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