/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-19 15:40:44
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-21 16:25:12
 */
const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register(path) {
    const info  = {}
    if (typeof path === 'string'){
      info.path = path
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 1)
    }else {
      info.path = '/'
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  match(method, url){
    let stack = []
    if(url === '/favicon.ico') {
      return stack
    }

    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])

    curRoutes.forEach(routeInfo => {
      if(url.indexOf(routeInfo.path) === 0){
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }

  // 核心的Next机制
  handle(req, res, stack) {
    const next = () => {
      const middleware = stack.shift()
      if(middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const resultList  = this.match(method, url)
      console.log('resultlist', resultList)
      this.handle(req, res, resultList)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

//工厂函数
module.exports = () => {
  return new LikeExpress()
}