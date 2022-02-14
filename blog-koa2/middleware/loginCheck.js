/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-18 17:53:14
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-21 18:01:06
 */
const { ErrorModel } = require('../model/resModel')

module.exports =async (ctx, next) => {
  console.log('dddd', ctx.session)
  if(ctx.session.username){
    await next()
    return
  }
  ctx.body = new ErrorModel('未登录')
}