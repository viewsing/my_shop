const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

//构造用户模型
const userSchema = new Schema({
  username: { unique: true, type: String, required: true },
  password: { type: String, required: true },
  userId: Schema.Types.ObjectId ,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
}, {
  collection: 'user'
})
//保存前，把密码加密
userSchema.pre('save', function(next) {
  bcrypt.genSalt( SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})
//静态方法
userSchema.statics = {
  /**
   * 比较密码
   * @param _password 用户输入密码
   * @param password 数据库存的密码
   * @returns {Promise<any>}
   */
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  }
}

//注册模型
mongoose.model('User', userSchema)
