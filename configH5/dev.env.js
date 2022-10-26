var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // Base_ShoppingAPI:'"http://192.168.0.95:811/"',
  // Base_UJAPI:'"http://192.168.0.95:801/"',
  // Base_WeixinOpenAPI:'"http://192.168.0.95:818/"',
  Base_ShoppingAPI:'"https://market.ujianchina.net/"',
  Base_UJAPI:'"https://live.ujianchina.net/"',
  Base_WeixinOpenAPI:'"https://live.ujianchina.net/"',
})
