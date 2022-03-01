function reverseLink(head) {
  let root = null
  let temp
  while (head) {
    temp = head.next
    head.next = root
    root = head
    head = temp
  }
  return root
}
