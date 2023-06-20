//引入路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
//使用VueRouter插件
Vue.use(VueRouter);

//防止多次传递参数出错方法
//call | apply 的区别
//相同点   都可以调用一次函数，都可以篡改函数上下文一次
//不同点   call传递多个函数用,进行隔离
//         apply 传递多个参数，采用数组
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    //这里this指向发生变化，需用call或apply进行调用
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>[])
  }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    //这里this指向发生变化，需用call或apply进行调用
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>[])
  }
}
const router = new VueRouter({
  //配置路由
  routes
})

export default router