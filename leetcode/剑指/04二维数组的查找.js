var findNumberIn2DArray = function (matrix, target) {
  if (matrix.length == 0) return false
  let low = 0,
    high = matrix[0].length - 1
  while (low < matrix.length && high >= 0) {
    if (matrix[low][high] > target) {
      high--
    } else if (matrix[low][high] < target) {
      low++
    } else {
      return true
    }
  }
  return false
}
