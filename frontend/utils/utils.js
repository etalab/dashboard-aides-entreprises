console.log('+ + + utils/utils... ')

// PURE UTILS

// - - - - - - - - - - - - - - - - - - - //
// CLEAN VALUES
// - - - - - - - - - - - - - - - - - - - //

export function capitalizeString (string) {
  return string[0].toUpperCase() + string.substring(1)
}
export function splitMulti (str, tokens, glue = ' ', capitalize = false) {
  var tempChar = tokens[0] // We can use the first token as a temporary join character
  // console.log("\n+ + + splitMulti / str : ", str)
  for (const token of tokens) {
    const strArray = str.split(token)
    // console.log("+ + + splitMulti / strArray : ", strArray)
    const strArrayNew = []
    for (let [i, s] of strArray.entries()) {
      if (capitalize) { s = capitalizeString(s.trim()) }
      if (glue && i > 0) { s = glue + s }
      strArrayNew.push(s)
    }
    // console.log("+ + + splitMulti / strArrayNew : ", strArrayNew)
    str = strArrayNew.join(tempChar)
  }
  const finalStrArray = str.split(tempChar)
  return finalStrArray
}

// - - - - - - - - - - - - - - - - - - - //
// SORT VALUES & ARRAY ORDER
// - - - - - - - - - - - - - - - - - - - //

export function moveArrayElement (arr, oldIndex, newIndex) {
  while (oldIndex < 0) {
    oldIndex += arr.length
  }
  while (newIndex < 0) {
    newIndex += arr.length
  }
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length
    while (k-- + 1) {
      arr.push(undefined)
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  return arr
}
export function sortByFieldName (arrayOfStuff, fieldName) {
  const sortedArray = arrayOfStuff.sort((a, b) => {
    var nameA = a[fieldName].toLowerCase()
    var nameB = b[fieldName].toLowerCase()
    // sort string ascending
    if (nameA < nameB) { return -1 }
    if (nameA > nameB) return 1
    return 0 // default return value (no sorting)
  })
  return sortedArray
}
export function sortByFieldValue (arrayOfStuff, fieldName, toNumber = true) {
  const sortedArray = arrayOfStuff.sort((a, b) => {
    const numbA = toNumber ? new Number(a[fieldName]) : a[fieldName]
    const numbB = toNumber ? new Number(b[fieldName]) : b[fieldName]
    return numbA - numbB
  })
  return sortedArray
}
export function sortByValue (arrayOfStuff) {
  const sortedArray = arrayOfStuff.sort((a, b) => {
    return a - b
  })
  return sortedArray
}
export function sortByFieldDate (arrayOfStuff, fieldName) {
  const sortedArray = arrayOfStuff.sort((a, b) => {
    var dateA = new Date(a[fieldName])
    var dateB = new Date(b[fieldName])
    return dateA - dateB // sort by date ascending
  })
  return sortedArray
}
export function sortArrayBy (arrayOfStuff, params) {
  let sortedArray = arrayOfStuff
  const sortBy = params.sortByType
  switch (sortBy) {
    case 'sortByFieldName':
      sortedArray = sortByFieldName(arrayOfStuff, params.fieldName)
      break
    case 'sortByFieldValue':
      sortedArray = sortByFieldValue(arrayOfStuff, params.fieldName)
      break
    case 'sortByValue':
      sortedArray = sortByValue(arrayOfStuff)
      break
    case 'sortByFieldDate':
      sortedArray = sortByFieldDate(arrayOfStuff, params.fieldName)
      break
  }
  return sortedArray
}

// - - - - - - - - - - - - - - - - - - - //
// SELECTOR FUNCTIONS FROM ENV VAR
// - - - - - - - - - - - - - - - - - - - //

const trueStrings = [
  'y',
  'yes',
  'Yes',
  'YES',
  'Y',
  'o',
  'oui',
  'Oui',
  'OUI',
  'O',
  't',
  'true',
  'True',
  'TRUE',
  'T'
]
// const falseStrings = [
//   'no',
//   'No',
//   'NO',
//   'NON',
//   'Non',
//   'non',
//   'n',
//   'N',
//   'false',
//   'False',
//   'FALSE',
//   'f',
//   'F'
// ]
export const chooseBooleanMode = (ARG) => {
  if (trueStrings.includes(ARG)) {
    return true
  } else {
    return false
  }
}

// - - - - - - - - - - - - - - - - - - - //
// FIND FROM ARRAY
// - - - - - - - - - - - - - - - - - - - //

export function findElementFromArrayAndId (id, targetArray, idField = 'id') {
  // console.log("+ + + findElementFromArrayAndId / id : ", id)
  const filteredOut = targetArray.find((item) => item[idField] === id)
  return filteredOut
}

// - - - - - - - - - - - - - - - - - - - //
// RETRIEVE OBJECT FROM PATH
// - - - - - - - - - - - - - - - - - - - //

export function objectFromPath (obj, path, separator = '.') {
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

export function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}
export function setNestedObjectFromPath (path, value, obj, separator = '.') {
  // console.log("+ + + setNestedObjectFromPath / obj : ", obj)
  // console.log("+ + + setNestedObjectFromPath / path : ", path)
  // console.log("+ + + setNestedObjectFromPath / value : ", value)

  // from : https://medium.com/data-scraper-tips-tricks/safely-read-write-in-deeply-nested-objects-js-a1d9ddd168c6
  // this is a super simple parsing, you will want to make this more complex to handle correctly any path
  // it will split by the dots at first and then simply pass along the array (on next iterations)
  const properties = Array.isArray(path) ? path : path.split(separator)

  // Not yet at the last property so keep digging
  if (properties.length > 1) {
    // The property doesn't exists OR is not an object (and so we overwritte it) so we create it
    if (
      !obj.hasOwnProperty(properties[0]) ||
      typeof obj[properties[0]] !== 'object'
    ) { obj[properties[0]] = {} }
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
export function setDeep (
  path,
  value,
  obj,
  setrecursively = false,
  separator = '.'
) {
  const pathWay = Array.isArray(path) ? path : path.split(separator)

  console.log('+ + + setDeep / pathWay : ', pathWay)
  console.log('+ + + setDeep / value : ', value)
  console.log('+ + + setDeep / obj : ', obj)

  pathWay.reduce((a, b, level) => {
    if (
      setrecursively &&
      typeof a[b] === 'undefined' &&
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

// - - - - - - - - - - - - - - - - - - - //
// FORMAT VALUES
// - - - - - - - - - - - - - - - - - - - //

export function toMillionsOrElse (x, params = { divider: 1000000, fixed: 2 }) {
  // console.log( "=== toMillions / x ", x )
  return parseFloat((parseFloat(x) / params.divider).toFixed(params.fixed))
}
export function toFloat (x, params = undefined) {
  // console.log( "=== toFloat / x ", x )
  return parseFloat(x)
}
export function switchFormatFunctions (value, format) {
  let val = value
  format.forEach((fn) => {
    switch (fn.utilsFnName) {
      case 'toMillionsOrElse':
        val = toMillionsOrElse(val, fn.params)
        break
      case 'toFloat':
        val = toFloat(val, fn.params)
        break
    }
  })
  return val
}
export function objectToUrlParams (obj) {
  let paramsString = ''
  paramsString = Object.entries(obj).map(([key, val]) => {
    if (val) {
      return `${key}=${val}`
    }
  }).join('&')
  return paramsString
}
