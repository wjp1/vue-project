import Vue from "vue";
import App from "./App.vue";
import VueLazyload from 'vue-lazyload'
import loading from "@/assets/images/loading.png"
//引入路由
import router from "./router";
import store from "./store";

//注册全局组件
import TypeNav from "@/components/TypeNav"
import ListContainer from "@/views/Home/ListContainer"
import CarouselLIst from "@/components/CarouselList"
import Pagination from "@/components/Pagination"
import Zoom from "@/components/Zoom"
import {Button,MessageBox} from "element-ui"

Vue.component("TypeNav",TypeNav)
Vue.component("ListContainer",ListContainer)
Vue.component("CarouselLIst",CarouselLIst)
Vue.component("Pagination",Pagination)
Vue.component("Zoom",Zoom)
Vue.component(Button.name,Button)



//引入mockServer.js    模拟数据
import '@/mock/mockServer'

//统一接口api文件夹里面全部请求函数
import * as API from "@/api"

//引入swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false;


//引入vue-lazy
Vue.use(VueLazyload, {
  loading: loading,
})


//引入自定义插件
import myPlugins from "@/plugins/myPlugin"
Vue.use(myPlugins,{
  name:'option'
})

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate(){
    console.log(this);
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;

  }
}).$mount("#app");
