/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-12-08 15:33:25
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-10 17:38:17
 */
const {exec} = require('../db/mysql.js')
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if(author){
    sql += `and author='${author}' `
  }
  if(keyword){
    sql += `and title like '%${keyword}%' `
  }
  sql+=`order by createtime desc`
  return exec(sql)
};

const getDetail = (id) => {
  const sql =  `select * from blogs where id='${id}'`
  return exec(sql).then(rows=> {
    return rows[0]
  })
};

const newBlog = (blogData = {}) => {
  const {title, content,author} =blogData
  const createtime= Date.now()
  const sql=`
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createtime}', '${author}')
  `
  return exec(sql).then(insertData=> {
    return {
      id:insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const {title, content} = blogData
  const sql = `update blogs set title='${title}', content='${content}' where id = '${id}'`
  return exec(sql).then(updateData => {
    if(updateData.affectedRows > 0){
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(deletedata => {
    if(deletedata.affectedRows > 0){
      return true
    }
    return false
  })
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
