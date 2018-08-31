const Koa = require('koa')
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const PORT = 3009

const { connect, initSchema } = require('./database/init')
let user = require('./appApi/user')

let router = new Router()
router.use('/user', user.routes())

;(async () => {
  await connect()
  initSchema()

})()

const app = new Koa()

app.use(cors())

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`Server Starting in ${PORT}...`)
})
