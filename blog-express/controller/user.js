/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-12-08 16:58:43
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-13 14:33:56
 */
const {exec, escape} = require('../db/mysql.js')

const login = (username, password) => {
  username = escape(username)
  password = escape(password)
  let sql = `
      select username, realname from users where username = ${username} and password = ${password}
  `
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  login
}