console.log("+ + + utils/utils... ")
import Vue from "vue"

// PURE UTILS


// - - - - - - - - - - - - - - - - - - - //
// CLEAN VALUES
// - - - - - - - - - - - - - - - - - - - //

export function splitMulti(str, tokens) {
  var tempChar = tokens[0] // We can use the first token as a temporary join character
  for (var i = 1; i < tokens.length; i++) {
    str = str.split(tokens[i]).join(tempChar)
  }
  str = str.split(tempChar)
  return str
}

// - - - - - - - - - - - - - - - - - - - //
// SORT VALUES & ARRAY ORDER
// - - - - - - - - - - - - - - - - - - - //

export function moveArrayElement(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length
  }
  while (new_index < 0) {
    new_index += arr.length
  }
  if (new_index >= arr.length) {
    let k = new_index - arr.length
    while (k-- + 1) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr
}

export function sortByFieldName(arrayOfStuff, fieldName) {
  let sortedArray = arrayOfStuff.sort((a, b) => {
    var nameA = a[fieldName].toLowerCase(),
      nameB = b[fieldName].toLowerCase()
    if (nameA < nameB)
      //sort string ascending
      return -1
    if (nameA > nameB) return 1
    return 0 //default return value (no sorting)
  })
  return sortedArray
}
export function sortByFieldValue(arrayOfStuff, fieldName, toNumber = true) {
  let sortedArray = arrayOfStuff.sort((a, b) => {
    let numbA = toNumber ? new Number(a[fieldName]) : a[fieldName]
    let numbB = toNumber ? new Number(b[fieldName]) : b[fieldName]
    // let result
    // switch( order ){
    //   case 'ascending'  : result = numbA - numbB  ; break ;
    //   case 'descending' : result = numbB - numbA  ; break ;
    // }
    // return result
    return numbA - numbB
  })
  return sortedArray
}
export function sortByValue(arrayOfStuff) {
  let sortedArray = arrayOfStuff.sort((a, b) => {
    return a - b
  })
  return sortedArray
}
export function sortByFieldDate(arrayOfStuff, fieldName) {
  let sortedArray = arrayOfStuff.sort((a, b) => {
    var dateA = new Date(a[fieldName]),
      dateB = new Date(b[fieldName])
    return dateA - dateB //sort by date ascending
  })
  return sortedArray
}

export function sortArrayBy(arrayOfStuff, params) {
  let sortedArray = arrayOfStuff
  let sortBy = params.sortByType
  switch (sortBy) {
    case "sortByFieldName":
      sortedArray = sortByFieldName(arrayOfStuff, params.fieldName)
      break
    case "sortByFieldValue":
      sortedArray = sortByFieldValue(arrayOfStuff, params.fieldName)
      break
    case "sortByValue":
      sortedArray = sortByValue(arrayOfStuff)
      break
    case "sortByFieldDate":
      sortedArray = sortByFieldDate(arrayOfStuff, params.fieldName)
      break
  }
  return sortedArray
}

// - - - - - - - - - - - - - - - - - - - //
// SELECTOR FUNCTIONS FROM ENV VAR
// - - - - - - - - - - - - - - - - - - - //

const trueStrings = [
  "yes",
  "Yes",
  "YES",
  "y",
  "Y",
  "true",
  "True",
  "TRUE",
  "t",
  "T",
]
const falseStrings = [
  "no",
  "No",
  "NO",
  "n",
  "N",
  "false",
  "False",
  "FALSE",
  "f",
  "F",
]
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

export function findElementFromArrayAndId(id, targetArray, idField = "id") {
  // console.log("+ + + findElementFromArrayAndId / id : ", id)
  let filteredOut = targetArray.find((item) => item[idField] === id)
  return filteredOut
}

// - - - - - - - - - - - - - - - - - - - //
// RETRIEVE OBJECT FROM PATH
// - - - - - - - - - - - - - - - - - - - //

export function objectFromPath(obj, path, separator = ".") {
  // console.log("\n+ + + objectFromPath / obj : ", obj)
  // console.log("+ + + objectFromPath / path : ", path)
  let object
  if (path) {
    var properties = Array.isArray(path) ? path : path.split(separator)
    // console.log("+ + + objectFromPath / properties : ", properties)
    object = properties.reduce((prev, curr) => prev && prev[curr], obj)
    // console.log("+ + + objectFromPath / object : ", object)
  } else {
    object = obj
  }
  return object
}

// - - - - - - - - - - - - - - - - - - - //
// SET NESTED OBJECT FROM PATH
// - - - - - - - - - - - - - - - - - - - //

export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function setNestedObjectFromPath(path, value, obj, separator = ".") {
  // console.log("+ + + setNestedObjectFromPath / obj : ", obj)
  // console.log("+ + + setNestedObjectFromPath / path : ", path)
  // console.log("+ + + setNestedObjectFromPath / value : ", value)

  // from : https://medium.com/data-scraper-tips-tricks/safely-read-write-in-deeply-nested-objects-js-a1d9ddd168c6
  // this is a super simple parsing, you will want to make this more complex to handle correctly any path
  // it will split by the dots at first and then simply pass along the array (on next iterations)
  let properties = Array.isArray(path) ? path : path.split(separator)

  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    // The property doesn't exists OR is not an object (and so we overwritte it) so we create it
    if (
      !obj.hasOwnProperty(properties[0]) ||
      typeof obj[properties[0]] !== "object"
    )
      obj[properties[0]] = {}
    // We iterate.
    return setNestedObjectFromPath(
      properties.slice(1),
      value,
      obj[properties[0]]
    )
    // This is the last property - the one where to set the value
  } else {
    // We set the value to the last property
    obj[properties[0]] = value
    return true // this is the end
  }
}

export function setDeep(
  path,
  value,
  obj,
  setrecursively = false,
  separator = "."
) {
  let pathWay = Array.isArray(path) ? path : path.split(separator)

  console.log("+ + + setDeep / pathWay : ", pathWay)
  console.log("+ + + setDeep / value : ", value)
  console.log("+ + + setDeep / obj : ", obj)

  pathWay.reduce((a, b, level) => {
    if (
      setrecursively &&
      typeof a[b] === "undefined" &&
      level !== pathWay.length
    ) {
      a[b] = {}
      return a[b]
    }
    if (level === pathWay.length) {
      a[b] = value
      return value
    }
    return a[b]
  }, obj)
}

// Example: to set a new property foo.bar.baz = true on a Vuex state object
// you would call setProp(state, ['foo', 'bar', 'baz'], true).
// The function creates any nested properties that don't already exist.

// export function setProp (obj, props, value) {
//   const prop = props.shift()
//   if (!obj[prop]) {
//     Vue.set(obj, prop, {})
//   }
//   if (!props.length) {
//     if (value && typeof value === 'object' && !Array.isArray(value)) {
//       obj[prop] = { ...obj[prop], ...value }
//     } else {
//       obj[prop] = value
//     }
//     return
//   }
//   setProp(obj[prop], props, value)
// }

// - - - - - - - - - - - - - - - - - - - //
// FORMAT VALUES
// - - - - - - - - - - - - - - - - - - - //

export function toMillionsOrElse(x, params = { divider: 1000000, fixed: 2 }) {
  // console.log( "=== toMillions / x ", x )
  return parseFloat((parseFloat(x) / params.divider).toFixed(params.fixed))
}

export function toFloat(x, params = undefined) {
  // console.log( "=== toFloat / x ", x )
  return parseFloat(x)
}

export function switchFormatFunctions(value, format) {
  let val = value
  format.forEach((fn) => {
    switch (fn.utilsFnName) {
      case "toMillionsOrElse":
        val = toMillionsOrElse(val, fn.params)
        break
      case "toFloat":
        val = toFloat(val, fn.params)
        break
    }
  })
  return val
}
