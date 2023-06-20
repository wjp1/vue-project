<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <!-- <Footer v-show="$route.path=='/home' || $route.path == '/search' ? true : false" /> -->
    <Footer v-show="$route.meta.isShow"/>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name:'',
  components:{
    Header,
    Footer
  },
  mounted() {
    //通过Vuex发送请求，来获得数据
    this.$store.dispatch('categoryList')
  },
  
}
</script>
<style>

</style>
