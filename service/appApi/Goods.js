const mongoose = require('mongoose')
const Router = require('koa-router')
const router = new Router()

router.post('/getGoodsDetailById', async function(ctx) {
  let goodsId = ctx.request.body.goodsId

  Goods = mongoose.model('Goods')

  let goods = await Goods.findOne({ID: goodsId})
  if (goods) {
    ctx.body = {
      resultCode: 200,
      data: goods
    }
  } else {
    ctx.body = {
      resultCode: 500,
      resultMessage: '该商品不存在'
    }
  }

})
