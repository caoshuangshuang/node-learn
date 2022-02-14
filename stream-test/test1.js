/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-01-11 17:13:40
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-01-13 11:08:33
 */
// 标准输入输入
// process.stdin.pipe(process.stdout)

// const http = require('http')
// const  server = http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     req.pipe(res)
//   }
// })
// server.listen(8001)

// 复制文件
const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')

// const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

// readStream.pipe(writeStream)

// readStream.on('data', chunk => {
//   console.log(chunk.toString())
// })
// readStream.on('end', () => {
//   console.log('copy down')
// })

// const http = require('http')
// const fs = require('fs')
// const path = require('path')
// const fileName1 = path.resolve(__dirname, 'data.txt')

// const  server = http.createServer((req, res) => {
//   if(req.method === 'GET') {
//     const readStream = fs.createReadStream(fileName1)
//     readStream.pipe(res)
//   }
// })
// server.listen(8001)
