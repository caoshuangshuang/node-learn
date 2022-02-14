/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-21 16:41:26
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-21 17:53:05
 */
const router = require('koa-router')()
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix('/api/user')

router.post('/login',async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const data= await login(username, password)
  if (data.username) {
    // 设置session
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;
    ctx.body = new SuccessModel();
    return;
  }
 ctx.body = new ErrorModel("登录失败");
})

module.exports = router
