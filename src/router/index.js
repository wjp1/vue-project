//引入路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
import store from "@/store"

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

//全局守卫，前置守卫(在路由跳转之前进行判断)
//to  跳到那
//from  从哪里来
//next  放行函数
router.beforeEach(async(to,from,next)=>{
  console.log(this ,'router.beforeEach');
  next()
  //后端返回的token令牌，判断是否登录
  let token = localStorage.getItem('TOKEN')
  //后端返回的用户数据，判断是否有用户信息
  let name = store.state.user.userInfo.name
  console.log(token,name);
  //是否登录
  if(token){
    //已登录
    //禁止登陆的用户去往登录页面
    if(to.path == "/login"){
      next('/home')
    }else{
      //在跳往其他页面时，判断用户信息是否过期
      if(name){
        next()
      }else{
        //没有用户信息，派发action
        try {
          await store.dispatch('user/userInfo')
          next()
        } catch (error) {
          //token失效了
          //清楚token
          await store.dispatch('user/userLogout')
        }
        
      }
    }
  }else{
    //未登录  不能去交易相关、支付相关[pay/center/]等路由
    if(to.path == '/trade' || to.path == '/pay' || to.path == '/center' || to.path == '/center/myorder'){
      console.log(to.path);
      //将跳往页面的路由，通过query传递
      next(`/login?redirect=${to.path}`)
    }else{
      //其他路由，放行
      next()
    }
  }
})

//全局解析守卫
router.beforeResolve((to,from,next)=>{
  next()
  console.log(this,'router.beforeResolve');
})

//全局后置钩子
router.afterEach((to,from)=>{
  // next()
  console.log(this,"afterEach");
})
export default router