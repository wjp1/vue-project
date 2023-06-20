<template>
  <div class="spec-preview">
    <img :src="imgList.imgUrl" />
    <div class="event" @mousemove="moveMask"></div>
    <div class="big">
      <img :src="imgList.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="maskRef"></div>
  </div>
</template>

<script>
export default {
    name:'Zoom',
    props:['sendImageList'],
    data() {
      return {
        currentIndex: 0,
      };
    },
    methods:{
      moveMask(event){
        let mask = this.$refs.maskRef
        let bigMask = this.$refs.bigImg
        let maskLeft = event.offsetX - mask.offsetWidth/2
        let maskTop =  event.offsetY - mask.offsetHeight/2
        //约束边境
        if(maskLeft<=0){
          maskLeft=0
        }else if(maskLeft>=mask.offsetWidth){
          maskLeft = mask.offsetWidth
        }
        if(maskTop<=0){
          maskTop=0
        }else if(maskTop>=mask.offsetHeight){
          maskTop = mask.offsetHeight
        }
        mask.style.left = maskLeft+'px'
        mask.style.top = maskTop+'px'
        bigMask.style.left = -2*maskLeft+'px'
        bigMask.style.top = -2*maskTop+'px'
      }
    },
    computed:{
        imgList(){
            return this.sendImageList[0] || []
        }
    },
    
    
}
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>