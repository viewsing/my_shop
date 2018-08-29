<template>
    <div>
      <div class="floor">

        <div class="floor-title">{{floorTitle}}</div>

        <div class="floor-anomaly">
          <div class="floor-one">
            <img v-if="floorData[0]" :src="floorData[0].image" width="100%" alt="一楼图片">
          </div>
          <div>
            <div class="floor-two">
              <img v-if="floorData[1]" :src="floorData[1].image" width="100%" alt="二楼左边图片">
            </div>
            <div>
              <img v-if="floorData[2]" :src="floorData[2].image" width="100%" alt="一楼右边图片">
            </div>
          </div>
        </div>

        <div class="floor-rule">
          <div v-for="(item, index) in floorData.slice(3)" :key="index">
            <img alt="底层图片" :src="item.image" width="100%">
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  export default {
    name: "floorComponent",
    props: ['floorData', 'floorTitle'],
  }
</script>

<style scoped>
  .floor-title{
    text-align:center;
    font-size:14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .floor-anomaly{
    display: flex;
    flex-direction:row;
    background-color: #fff;
    border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
    width:10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .floor-one{
    border-right:1px solid #ddd;
  }
  .floor-two{
    border-bottom:1px solid #ddd;
  }
  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    background-color: #fff;
  }
  .floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:10rem;
    border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
  }
</style>
