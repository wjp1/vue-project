// import Home from "@/views/Home"
// import Login from "@/views/Login"
// import Register from "@/views/Register"
// import Search from "@/views/Search"
// import Detail from "@/views/Detail"
// import AddCartSucess from "@/views/AddCartSucess"
// import ShopCart from "@/views/ShopCart"
// import Trade from "@/views/Trade"
// import Pay from "@/views/Pay"
// import Center from "@/views/Center"
// import myOrder from "@/views/Center/myOrder"
// import groupOrder from "@/views/Center/groupOrder"

export default [
    {
      path:"/home",
      component:()=>import("@/views/Home"),
      //路由元信息
      meta:{isShow:true}
    },
    {
      path:"/login",
      component:()=>import("@/views/Login"),
      meta:{isShow:false}
    },
    {
      path:"/register",
      component:()=>import("@/views/Register"),
      meta:{isShow:false}
    },
    {
      name:"search",
      path:"/search/:keyword?",
      component:()=>import("@/views/Search"),
      meta:{isShow:true}
    },
    {
      name:'detail',
      path:"/detail/:goodsid",
      component:()=>import("@/views/Detail"),
      meta:{isShow:true}
    },
    {
      name:'addcartsucess',
      path:"/addcartsucess",
      component:()=>import("@/views/AddCartSucess")
    },
    {
      name:'shopcart',
      path:'/shopcart',
      component:()=>import("@/views/ShopCart")
    },
    {
      name:'trade',
      path:'/trade',
      component:()=>import("@/views/Trade"),
      //路由独享守卫
      beforeEnter:(to, from, next) => {
        if(from.path == '/shopcart'){
          next()
        }else{
          //中断当前路由导航，from从哪来，就回哪去
          next(false)
        }
      }
    },
    {
      name:'pay',
      path:'/pay',
      component:()=>import("@/views/Pay"),
      //路由独享守卫
      beforeEnter:(to,from,next)=>{
        if(from.path == 'trade'){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      name:'center',
      path:'/center',
      component:()=>import("@/views/Center"),
      children:[
        {
        path:'myorder',
        component:()=>import("@/views/Center/myOrder")
        },
        {
          path:'grouporder',
          component:()=>import("@/views/Center/groupOrder")
        },
        {
          path:'/center',
          redirect:'/center/myorder'
        }
      ]
    },
    //路由重定向：在项目跑起来的时候，访问/时，立马让他定向到首页
    {
      path:"*",
      redirect:"/home"
    }
  ]