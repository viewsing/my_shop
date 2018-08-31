const { resolve } = require('path')
const mongoose = require('mongoose')
const glob = require('glob')

const db = 'mongodb://localhost/my_shop-db'

mongoose.Promise = global.Promise

exports.connect = () => {

    //连接数据库
    mongoose.connect(db)

    let maxConnectionTimes = 0

    return new Promise((resolve, reject) => {
      //数据库断开连接事件
      mongoose.connection.on('disconnected', () => {
        console.log('***********数据库连接断开**********')
        if (maxConnectionTimes < 3) {
          maxConnectionTimes++
          //进行重连
          mongoose.connect(db)
        } else {
          reject()
          throw new Error('数据库出现异常....')
        }
      })

      //数据库连接错误事件
      mongoose.connection.on('error', err => {
        console.log('***********数据库错误***********')
        if(maxConnectTimes<3){
          maxConnectTimes++
          mongoose.connect(db)
        }else{
          reject(err)
          throw new Error('数据库出现异常......')
        }
      })

      //数据库连接事件
      mongoose.connection.on('open', () => {
        console.log('MongoDB已经成功连接')
        resolve()
      })

    })
}

exports.initSchema = () => {
  glob.sync( resolve(__dirname, './schema/', '**/*.js',) ).forEach(require)
}
