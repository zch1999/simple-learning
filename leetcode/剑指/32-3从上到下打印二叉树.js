var levelOrder = function (root) {
  if (!root) return []
  let arr = [root],
    res = []
  let i = 1
  while (arr.length) {
    let queue = []
    let len = arr.length
    while (len--) {
      let temp = arr.shift()
      // 另一种解法, 下面的queue就不需要翻转了
      // if (i % 2 == 1) queue.unshift(temp.val)
      queue.push(temp.val)
      temp.left && arr.push(temp.left)
      temp.right && arr.push(temp.right)
    }
    i++
    if (i % 2 == 1) queue = queue.reverse()
    res.push(queue)
  }
  return res
}
