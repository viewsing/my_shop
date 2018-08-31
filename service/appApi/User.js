const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页'
})


router.post('/register', async (ctx) => {
  const User = mongoose.model('User')

  let newUser = new User( ctx.request.body )
  await newUser.save().then(()=> {
    ctx.body = {
      resultCode: 200,
      resultMsg: '注册成功'
    }
  }).catch(err => {
    console.log(err)
    ctx.body = {
      resultCode: 500,
      resultMsg: err
    }
  })

})

router.post('/login', async ctx => {
  const User = mongoose.model('User')

  const username = ctx.request.body.username
  const password = ctx.request.body.password

  let user = await User.findOne({username})

  if (user) {
    const result = await User.comparePassword(password, user.password)
    if ( result ) {
      ctx.body = {
        resultCode: 200,
        resultMessage: '登录成功'
      }
    } else {
      ctx.body = {
        resultCode: 500,
        resultMessage: '密码错误'
      }
    }
  } else {
    ctx.body = {
      resultCode: 500,
      resultMessage: '用户不存在'
    }
  }

})

module.exports = router
