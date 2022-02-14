/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-12-08 16:58:43
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-21 17:37:06
 */
const {exec, escape} = require('../db/mysql.js')

const login = async (username, password) => {
  username = escape(username)
  password = escape(password)
  let sql = `
      select username, realname from users where username = ${username} and password = ${password}
  `
  const rows = await exec(sql)
  return rows[0] || {}
}

module.exports = {
  login
}