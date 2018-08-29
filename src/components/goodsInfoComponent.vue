<template>
    <div class="goods-info">
      <div class="goods-image">
        <img width="90%" alt="商品图片" :v-lazy="goodsImage">
      </div>
      <div class="goods-name">{{goodsName}}</div>
      <div class="goods-price">￥{{goodsPrice | moneyFilter}}</div>
    </div>
</template>

<script>
  import {toMoney} from '@/filter/moneyFilter'
  export default {
    name: "goodsInfoComponent",
    props: ['goodsImage', 'goodsName', 'goodsPrice'],
    filters: {
      moneyFilter(money) {
        return toMoney(money)
      }
    }
  }
</script>

<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
