var levelOrder = function (root) {
  if (!root) return []
  let arr = [root],
    res = []
  while (arr.length) {
    let temp = arr.shift()
    temp.left && arr.push(temp.left)
    temp.right && arr.push(temp.right)
    res.push(temp.val)
  }
  return res
}
