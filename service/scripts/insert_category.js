const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { connect, initSchema } = require('../database/init')

fs.readFile( path.resolve(__dirname, '../json_data/category.json'), 'utf8', function(err, data) {
  const json = JSON.parse(data)
  ;(async function(){
    await connect()
    initSchema()

    const Category = mongoose.model('Category')

    let saveCount=0

    json.RECORDS.map((value,index)=>{
      let newCategory = new Category(value)
      newCategory.save().then(()=>{
        saveCount++
        console.log('成功'+saveCount)
      }).catch(error=>{
        console.log('失败：'+error)
      })
    })

  })()
})
