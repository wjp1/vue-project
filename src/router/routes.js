import Home from "@/views/Home"
import Login from "@/views/Login"
import Register from "@/views/Register"
import Search from "@/views/Search"
import Detail from "@/views/Detail"
import AddCartSucess from "@/views/AddCartSucess"
import ShopCart from "@/views/ShopCart"

export default [
    {
      path:"/home",
      component:Home,
      //路由元信息
      meta:{isShow:true}
    },
    {
      path:"/login",
      component:Login,
      meta:{isShow:false}
    },
    {
      path:"/register",
      component:Register,
      meta:{isShow:false}
    },
    {
      name:"search",
      path:"/search/:keyword?",
      component:Search,
      meta:{isShow:true}
    },
    {
      name:'detail',
      path:"/detail/:goodsid",
      component:Detail,
      meta:{isShow:true}
    },
    {
      name:'addcartsucess',
      path:"/addcartsucess",
      component:AddCartSucess
    },
    {
      name:'shopcart',
      path:'/shopcart',
      component:ShopCart
    },
    //路由重定向：在项目跑起来的时候，访问/时，立马让他定向到首页
    {
      path:"*",
      redirect:"/home"
    }
  ]