import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "./router";
import store from "./store";

//注册全局组件
import TypeNav from "@/components/TypeNav"
import ListContainer from "@/views/Home/ListContainer"
import CarouselLIst from "@/components/CarouselList"
import Pagination from "@/components/Pagination"
import Zoom from "@/components/Zoom"

Vue.component("TypeNav",TypeNav)
Vue.component("ListContainer",ListContainer)
Vue.component("CarouselLIst",CarouselLIst)
Vue.component("Pagination",Pagination)
Vue.component("Zoom",Zoom)

//引入mockServer.js    模拟数据
import '@/mock/mockServer'

//引入swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount("#app");
