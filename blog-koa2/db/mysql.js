/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-12-20 17:00:43
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-13 14:32:58
 */
const mysql = require('mysql')
const {getMysqlConf} = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(getMysqlConf())

// 开始连接
con.connect()

// 统一执行sql语句
function exec(sql){
  const promise = new Promise((resolve,reject)=>{
    con.query(sql,(err, result)=>{
      if(err){
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  exec,
  escape:mysql.escape
}