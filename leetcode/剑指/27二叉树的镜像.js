var mirrorTree = function (root) {
  if (!root) return null
  ;[root.left, root.right] = [root.right, root.left]
  mirrorTree(root.left)
  mirrorTree(root.right)
  return root
}
