/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-08 09:36:00
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-19 13:53:32
 */
const { createClient } = require('redis')
const { getRedisConf } = require('../conf/db.js')

const REDIS_CONF= getRedisConf()

// 创建客户端
const redisClient = createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})

module.exports = redisClient