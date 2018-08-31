const fs = require('fs')
const path = require('path')

fs.readFile( path.resolve(__dirname, '../json_data/goods.json'), 'utf8', function(err, data) {
  const json = JSON.parse(data)
  let i=0
  let ret=[]

  json.RECORDS.forEach(function(value,index){
    if( value.IMAGE1 != null ){
      i++
      ret.push(value)
    }
  })

  console.log(i)

  fs.writeFile( path.resolve(__dirname, '../json_data/newGoods.json'), JSON.stringify(ret), function(err){
    if (err) {
      console.log('文件写入失败 ' + err.toString())
    } else {
      console.log('文件写入成功')
    }
  })
})
