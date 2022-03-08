/*
 * @Author: zch1999
 * @Email: 1901394767@qq.com
 * @Date: 2022-03-08 22:02:00
 * @Last Modified by:   zch1999
 * @Last Modified time: 2022-03-08 22:02:00
 * @Description: Description
 */

var numWays = function(n) {
    let dp = [1, 1]
    for(let i = 2; i <= n; i++) {
      dp[i] = (dp[i-1] + dp[i-2]) % 1000000007
    }
    return dp[n]
  };