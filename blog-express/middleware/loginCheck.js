/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-18 17:53:14
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-18 17:56:13
 */
const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
  if(req.session,username){
    next()
    return
  }
  res.json(
    new ErrorModel('未登录')
  )
}