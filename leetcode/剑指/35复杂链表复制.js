var copyRandomList = function (head) {
  if (!head) return head
  let root = head
  while (root) {
    root.next = new Node(root.val, root.next)
    root = root.next.next
  }
  root = head
  while (root) {
    if (root.random !== null) {
      root.next.random = root.random.next
    }
    root = root.next.next
  }

  let newHead = head.next,
    res = head.next
  while (newHead.next) {
    head.next = head.next.next
    newHead.next = newHead.next.next
    head = head.next
    newHead = head.next
  }
  head.next = null
  return res
}
