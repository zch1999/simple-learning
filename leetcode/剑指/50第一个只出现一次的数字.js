var firstUniqChar = function (s) {
  let obj = {}
  for (const item of s) {
    if (obj[item]) {
      obj[item]++
    } else {
      obj[item] = 1
    }
  }
  for (const v of Object.keys(obj)) {
    if (obj[v] === 1) return v
  }
  return ' '
}

firstUniqChar('sdfasdf')
