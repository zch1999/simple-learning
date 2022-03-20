var maxProfit = function(prices) {
    let min = prices[0] ,res = 0
    for(let i = 0; i < prices.length; i++) {
      min = Math.min(prices[i], min)
      res = Math.max(res, prices[i] - min)
    }
    return res
  };