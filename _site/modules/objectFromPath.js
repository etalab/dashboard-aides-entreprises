console.log("= = = modules/utils... ")

// - - - - - - - - - - - - - - - - - - - //
// RETRIEVE OBJECT FROM PATH
// - - - - - - - - - - - - - - - - - - - //

export default function objectFromPath(obj, path, separator = ".") {
  console.log("= = = objectFromPath / path : ", path)
  let object

  if (path) {
    var properties = Array.isArray(path) ? path : path.split(separator)
    console.log("= = = objectFromPath / properties : ", properties)

    object = properties.reduce((prev, curr) => prev && prev[curr], obj)
    console.log("= = = objectFromPath / object : ", object)
  } else {
    object = obj
  }

  return object
}
