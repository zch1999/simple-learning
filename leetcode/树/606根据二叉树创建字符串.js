// function tree2str(root) {
//     if (!root) return ''
//      function pro(node) {
//        if (!node) return ''
//        let leftStr = pro(node.left)
//        let rightStr = pro(node.right)
//        let s = ''
//        if (!leftStr && rightStr) s = '(' + ')' + '(' + rightStr + ')'
//        if (!rightStr && leftStr) s = '(' + leftStr + ')'
//        if (rightStr && leftStr) s = '(' + leftStr + ')' + '(' + rightStr + ')'
//        let resultStr = node.val + s
//        return resultStr
//      }
//      return pro(root)
//    };  
   
   var tree2str = function(root) {
    if(!root) return ''
    let str = root.val + ''
    str = str + ((!root.right && !root.left) ? '' : `(${tree2str(root.left)})`)
    str = str + (root.right ? `(${tree2str(root.right)})` : '')
    return str
  };