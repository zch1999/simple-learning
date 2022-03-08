/*
 * @Author: zch1999
 * @Email: 1901394767@qq.com
 * @Date: 2022-03-08 22:02:55
 * @Last Modified by:   zch1999
 * @Last Modified time: 2022-03-08 22:02:55
 * @Description: Description
 */

var fib = function(n) {
    if(n == 0) return 0
    if(n == 1) return 1
    let f1 = 0, f2 = 1
    let res = 0
    n = n-1
    while(n--) {
      res = (f1 + f2) % 1000000007
      f1 = f2
      f2 = res
    }
    return res 
}

var fib = function(n) {
    let dp = [0, 1]
    for(let i = 2; i <= n; i++) {
        dp[i] = (dp[i-1] + dp[i-2]) % 1000000007
    }
    return dp[n]
}