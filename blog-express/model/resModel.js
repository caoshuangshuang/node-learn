/*
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2021-12-08 11:59:39
 * @LastEditors: 曹双双
 * @LastEditTime: 2021-12-08 15:26:35
 */
class BaseModel {
  constructor(data, message){
    if(typeof data === 'string'){
      this.message = data
      data = null
      message = null
    }
    if(data) {
      this.data = data
    }
    if(message){
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data,message){
    super(data,message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data,message){
    super(data,message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}