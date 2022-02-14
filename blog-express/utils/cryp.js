/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-13 17:41:22
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-13 17:47:43
 */
const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'WJIO;_8776#'

// md5加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}$key=${SECRET_KEY}`
}

module.exports = {
  genPassword
}