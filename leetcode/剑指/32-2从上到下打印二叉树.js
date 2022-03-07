// 我的垃圾,我的快
var levelOrder = function (root) {
  if (!root) return []
  let arr = [root],
    res = [[]]
  let len = arr.length
  let i = 0
  while (arr.length) {
    if (len == 0) {
      i++
      res.push([])
      len = arr.length
    }
    let temp = arr.shift()
    res[i].push(temp.val)
    len--
    temp.left && arr.push(temp.left)
    temp.right && arr.push(temp.right)
  }
  return res
}

var levelOrder = function (root) {
  if (!root) return []
  let arr = [root],
    res = []
  while (arr.length) {
    let queue = []
    let len = arr.length
    while (len--) {
      let temp = arr.shift()
      queue.push(temp.val)
      temp.left && arr.push(temp.left)
      temp.right && arr.push(temp.right)
    }
    res.push(queue)
  }
  return res
}
