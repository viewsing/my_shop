const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const URL = {
  getShoppingMallInfo: 'index',
  getGoodsInfo: 'getGoodsInfo'
}
//遍历一遍加上baseUrl
Object.keys(URL).map(key => {
  URL[key] = BASEURL + URL[key]
})

export default URL
