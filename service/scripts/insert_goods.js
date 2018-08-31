const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { connect, initSchema } = require('../database/init')

fs.readFile(path.resolve(__dirname, '../json_data/newGoods.json'), 'utf8', function(err, data) {
  const json = JSON.parse(data)
  let saveCount = 0

  ;(async () => {
    await connect()
    initSchema()

    const Goods = mongoose.model('Goods')

    json.forEach((value, index) => {
      const newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功: ' + saveCount)
      }).catch(err => {
        console.log('失败: ' + err)
      })
    })

  })()

})
