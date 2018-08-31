const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = 'http://localhost:3009/'
const URL = {
  getShoppingMallInfo: 'index',
  getGoodsInfo: 'getGoodsInfo',
  registerUser: 'user/register',
  login: 'user/login',
}
//遍历一遍加上baseUrl
Object.keys(URL).map(key => {
  if (key === 'registerUser') {
    URL[key] = LOCALURL + URL[key]
  } else if (key === 'login') {
    URL[key] = LOCALURL + URL[key]
  } else {
    URL[key] = BASEURL + URL[key]
  }
})

export default URL
