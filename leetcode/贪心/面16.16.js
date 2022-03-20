var subSort = function(arr) {
    let max = -Infinity , min = Infinity
    let s = -1,f = -1
    //找到右边的index
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] >= max) {
        max = arr[i]
      }else {
        f = i
      }
    }
    //找到左边的index
    for(let j = arr.length - 1; j >= 0; j--) {
      if(arr[j] <= min) {
        min = arr[j]
      }else {
        s = j
      }
    }
    return [s,f]
  };