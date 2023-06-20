<template>
  <!--banner轮播-->
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item) in list" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name:'CarouselList',
  props:['list'],
  watch:{
    list:{
      immediate:true,
      //当前这个函数执行后，只能保证bannerList数据已经有了，但是没法保证v-for已经执行结束了
      handler(newValue,oldValue){
        //$nextTick()  在下次DOM更新  循环结束之后  执行延迟回调；在修改数据之后  立即使用这方法，获取更新后的DOM
        //保证页面中的结构已经存在
        this.$nextTick(()=>{
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay: {
              disableOnInteraction: false, // 用户操作了轮播图之后，不会停止自动轮播
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
        
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #mySwiper {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>