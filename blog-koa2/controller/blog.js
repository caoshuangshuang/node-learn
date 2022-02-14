/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-12-08 15:33:25
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-21 17:32:03
 */
const xss = require("xss");
const { exec } = require("../db/mysql.js");
const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc`;
  return await exec(sql);
};

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`;
  const rows = await exec(sql);
  return rows[0];
};

const newBlog = async (blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const createtime = Date.now();
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createtime}', '${author}')
  `;
  const insertData = await exec(sql);
  return {
    id: insertData.insertId,
  };
};

const updateBlog = async (id, blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const sql = `update blogs set title='${title}', content='${content}' where id = '${id}'`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
};

const delBlog = async (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  const deletedata = await exec(sql);
  if (deletedata.affectedRows > 0) {
    return true;
  }
  return false;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
