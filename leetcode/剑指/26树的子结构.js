var isSubStructure = function (A, B) {
  if (!A || !B) return false
  return isSample(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
}

function isSample(A, B) {
  if (!B) return true
  if (!A) return false
  if (A.val !== B.val) return false
  return isSample(A.left, B.left) && isSample(A.right, B.right)
}
