/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-12-20 16:52:25
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-10 11:03:16
 */
const env = process.env.NODE_ENV

const MYSQL_CONF = {
  dev:{
    host: 'localhost',
    user: 'root',
    password: '123.shuang',
    port: '3306',
    database: 'myblog'
   },
  production:{
    host: 'localhost',
    user: 'root',
    password: '123.shuang',
    port: '3306',
    database: 'myblog'
   }
}

const REDIS_CONF = {
  dev:{
    port: '6379',
    host: '127.0.0.1'
  },
  production:{
    port: '6379',
    host: '127.0.0.1'
  }
}

getMysqlConf = () => {
  return MYSQL_CONF[env]
}

getRedisConf = () => {
  return REDIS_CONF[env]
}


module.exports = {
  getMysqlConf,
  getRedisConf
}
