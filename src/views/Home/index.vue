<template>
  <div>
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="item in floorList" :key="item.id" :floorList="item" />
      <Brand/>
  </div> 
</template>

<script>
import ListContainer from "@/views/Home/ListContainer"
import Recommend from "@/views/Home/Recommend"
import Rank from "@/views/Home/Rank"
import Like from "@/views/Home/Like"
import Floor from "@/views/Home/Floor"
import Brand from "@/views/Home/Brand"
import { mapState } from 'vuex'
export default {
  name:'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState({floorList:state=>state.home.floorList})
  },
  mounted() {
    //派发action：通过Vuex发起ajax请求，将floor存在仓库中
    this.$store.dispatch('getFloorList')

    //获取用户信息，在首页展示
    this.$store.dispatch('user/userInfo')
  },
  
}
</script>

<style>

</style>