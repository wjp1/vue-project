<template>
  <div class="img">
    <CarouselList :list="sendImageList"/>
  </div>
  
</template>

<script>
import CarouselList from "@/components/CarouselList"
export default {
  name:'ImgList',
  props:['sendImageList'],
  components:{
    CarouselList
  },
  
  

}
</script>

<style scoped>
  .img {
    width: 415px !important;
    height: 150px !important;
  }
</style>