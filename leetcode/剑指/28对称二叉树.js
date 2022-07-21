var isSymmetric = function (root) {
  if (!root) return null
  return isSample(root.left, root.right)
}

function isSample(A, B) {
  if ((!A && B) || (A && !B)) {
    return false
  } else if (!A && !B) {
    return true
  } else if (A.val !== B.val) {
    return false
  }
  return A.val === B.val && isSample(A.left, B.right) && isSample(A.right, B.left)
}
