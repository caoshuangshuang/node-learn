/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-20 11:39:50
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-20 17:48:01
 */
const likeExpress = require('./like-express')
const app = likeExpress()

app.use((req, res, next) => {
  console.log(1)
  next()
})

app.use('/', (req, res, next) => {
  console.log(2)
  // next()
})

app.use('/api/', (req, res, next) => {
  console.log(3)
  next()
})

app.get('/api/get', (req, res, next) => {
  console.log(4)
  next()
})

app.post('/api/post', (req, res, next) => {
  console.log(5)
  next()
})

app.listen(3000,() => {
  console.log('server running on 3000')
})