/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-18 11:38:34
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-19 11:21:53
 */
var express = require("express");
var router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

router.get("/list", function (req, res, next) {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";
  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModel("未登录"));
      return;
    }
    author = req.session.username;
  }
  return getList(author, keyword).then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

router.get("/detail", function (req, res, next) {
  return getDetail(req.query.id).then((data) => {
    res.json(new SuccessModel(data));
  });
});

router.post("/new", loginCheck, function (req, res, next) {
  req.body.author = req.session.username;
  return newBlog(req.body).then((data) => {
    res.json(SuccessModel(data));
  });
});

router.post("/update", loginCheck, function (req, res, next) {
  return updateBlog(id, req.body).then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("更新博客失败"));
    }
  });
});

router.post("/del", loginCheck, function (req, res, next) {
  const author = req.session.usernam;
  return delBlog(req.query.id, author).then((data) => {
    if (data) {
      res.json(new SuccessModel(data));
    } else {
      res.json(new ErrorModel("删除博客失败"));
    }
  });
});

module.exports = router;
