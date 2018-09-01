const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { connect, initSchema } = require('../database/init')

fs.readFile( path.resolve(__dirname, '../json_data/category_sub.json'), 'utf8', function(err, data) {
  const json = JSON.parse(data)

  ;(async function(){
    await connect()
    initSchema()

    const CategorySub = mongoose.model('CategorySub')
    let saveCount = 0

    json.RECORDS.map(function(item, index) {
      const newCategorySub = new CategorySub(item)
      newCategorySub.save().then(()=>{
        saveCount++
        console.log('成功: ' + saveCount)
      }).catch(() => {
        saveCount++
        console.log('失败: ' + saveCount)
      })
    })

  })()
})
