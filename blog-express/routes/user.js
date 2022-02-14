/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-18 11:38:34
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-19 14:14:40
 */
var express = require("express");
var router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  return login(username, password).then( (data) => {
    if (data.username) {
      // 设置session
      req.session.username = data.username;
      req.session.realname = data.realname;
      res.json(new SuccessModel());
      return;
    }
    res.json(new ErrorModel("登录失败"));
  });
});

module.exports = router;
