import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
//引入模块仓库
import home from "./home"
import search  from "./search"
import detail from "./detail"
import shopcart from "./shopcart"
import user from "./user"
/*//Vuex存储数据的地方
const state = {}
//修改数据的方法
const mutations = {}
//响应组件中的动作，用来书写业务逻辑，不能修改数据
const actions = {}
//对数据进行加工
const getters = {}*/

export default new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    shopcart,
    user
  }
});
