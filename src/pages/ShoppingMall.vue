<template>
    <div>

      <div class="search-bar">
        <van-row>
          <van-col span="3">
            <img :src="locationIcon" class="search-icon" alt="位置">
          </van-col>
          <van-col span="16">
            <input type="text" class="search-input">
          </van-col>
          <van-col span="5">
            <van-button size="mini">测试</van-button>
          </van-col>
        </van-row>
      </div>

      <div class="swipe-area">
        <van-swipe :autoplay="2000">
          <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
            <img v-lazy="banner.image" width="100%" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="type-bar">
        <div v-for="(cate, index) in category" :key="index" >
          <img v-lazy="cate.image" width="90%" alt="分类图片">
          <span>{{cate.mallCategoryName}}</span>
        </div>
      </div>

      <div class="ad-banner">
        <img v-lazy="adBanner.PICTURE_ADDRESS" alt="广告图片" width="100%" >
      </div>

      <div class="recommend-area">
        <div class="recommend-title"></div>
        <div class="recommend-body">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
              <div class="recommend-item">
                <img :src="item.image" width="80%" alt="推荐商品图片">
                <div>{{item.goodsName}}</div>
                <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <floor-component :floor-data="floor1" :floor-title="floorName.floor1" />
      <floor-component :floor-data="floor2" :floor-title="floorName.floor2" />
      <floor-component :floor-data="floor3" :floor-title="floorName.floor3" />

      <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
          <van-list>
              <van-row gutter="20">
                <van-col span="12" v-for="(item,index) in hotGoods" :key="index" >
                  <goods-info :goods-image="item.image" :goods-name="item.name" :goods-price="item.price" ></goods-info>
                </van-col>
              </van-row>
          </van-list>
        </div>
      </div>

    </div>
</template>

<script>
  import axios from 'axios'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import floorComponent from '../components/floorComponent'
  import goodsInfoComponent from '../components/goodsInfoComponent'
  export default {
    name: "ShoppingMall",
    data() {
      return {
        locationIcon: require('../assets/image/icon-location.png'),
        swiperOption: {
          slidesPerView:3,
        },
        bannerPicArray: [],
        category: [],
        adBanner: [],
        recommendGoods: [],
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {},
        hotGoods: []
      }
    },
    created() {
      axios({
        url: 'https://www.easy-mock.com/mock/5b343f04dd3f32719ff054b5/my_shop/index',
        method: 'get'
      })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            this.category = response.data.data.category
            this.adBanner = response.data.data.advertesPicture
            this.bannerPicArray = response.data.data.slides
            this.recommendGoods = response.data.data.recommend
            this.floor1 = response.data.data.floor1
            this.floor2 = response.data.data.floor2
            this.floor3 = response.data.data.floor3
            this.floorName = response.data.data.floorName
            this.hotGoods = response.data.data.hotGoods
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    components: {
      swiper,
      swiperSlide,
      'floor-component': floorComponent,
      'goods-info': goodsInfoComponent
    }
  }
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border: 0px;
  border-bottom: 1px solid;
  border-color: #e5017d;
  color: #fff;
}
.search-icon {
  height: 100%;
  padding-top: .2rem;
  padding-bottom: .3rem;
}
.swipe-area {
  width: 20rem;
  overflow: hidden;
  clear: both;
}
.type-bar {
  background-color: #fff;
  margin: 0 .3rem .3rem .3rem;
  border-radius: .3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: .3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: .3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: .2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
</style>
