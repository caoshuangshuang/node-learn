/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-21 16:41:16
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-21 18:03:47
 */
const router = require("koa-router")();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/blog");

router.get("/list", async function (ctx, next) {
  let author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";
  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.bocy = new ErrorModel("未登录");
      return;
    }
    author = ctx.session.username;
  }
  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData);
});

router.get("/detail", async function (ctx, next) {
  const data = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(data);
});

router.post("/new", loginCheck, async function (ctx, next) {
  const body = ctx.request.body;
  body.author = ctx.session.username;
  const data = await newBlog(body);
  ctx.body = new SuccessModel(data);
});

router.post("/update", loginCheck, async function (ctx, next) {
  const data = await updateBlog(id, ctx.request.body);
  if (data) {
    ctx.bpdy = new SuccessModel(data);
  } else {
    ctx.bpdy = new ErrorModel("更新博客失败");
  }
});

router.post("/del", loginCheck, async function (ctx, next) {
  const author = ctx.session.username;
  const data = delBlog(ctx.query.id, author);
  if (data) {
    ctx.body = new SuccessModel(data);
  } else {
    ctx.body = new ErrorModel("删除博客失败");
  }
});

module.exports = router;
