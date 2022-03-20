
var getKthFromEnd = function(head, k) {
    if(!head) return null
    let slow = head
        while(head) {
        if(k-- <= 0) {
            slow = slow.next
        }
        head= head.next
        }
        return slow
};