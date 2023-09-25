import requests from "./request"
import mockRequests from './mockAjax'


//获取三级菜单的数据
const reqCategoryList = ()=>{
    return requests({
        method:'get',
        url:'/product/getBaseCategoryList'
    })
}

//获取轮播图数据
const reqBannerList = ()=>{
    return mockRequests({
        method:'get',
        url:'/banner'
    })
}

//获取floor数据
const reqFloorList = ()=>{
    return mockRequests({
        method:'get',
        url:'/floor'
    })
}

//获取搜索模块的数据
//如果是post方法，你需要给服务器传递一个空对象，否则会失败
const reqSearchInfo = (data)=>{
    return requests({
        method:'post',
        url:'/list',
        data
    })
}

//获取详情页数据
const reqDetailInfo = (goodsid)=>{
    return requests({
        method:'get',
        url:`/item/${goodsid}`
    })
}

//将产品添加到购物车
const reqAddOrUpdataShopCart = (skuId,skuNum)=>{
    return requests({
        method:'post',
        url:`/cart/addToCart/${skuId}/${skuNum}`
    })
}

//获取个人购物车数据
const reqGetShopCart = ()=>{
    return requests({
        method: "get", 
        url: "/cart/cartList" 
    })
}

//修改购物车数量
const reqUpDataShopCar = (skuId,skuNum)=>{
    return requests({
        method:'post',
        url:`/cart/addToCart/${skuId}/${skuNum}`
    })
}

//删除购物车物品
const reqDelShopCart = (skuId)=>{
    return requests({
        method:'delete',
        url:`/cart/deleteCart/${skuId}`
    })
}

//修改商品选择的状态
const reqUpdataCheckedType = (skuId,isChecked)=>{
    return requests({
        method:'get',
        url:`/cart/checkCart/${skuId}/${isChecked}`
    })
}

//获取验证码
const reqGetCode = (phone)=>{
    return requests({
        method:'get',
        url:`/user/passport/sendCode/${phone}`
    })
}

//注册
const reqUserRegister = (data)=>{
    return requests({
        method:'post',
        url:`/user/passport/register`,
        data:data
    })
}

//登录
const reqUserLogin = (data)=>{
    return requests({
        method: "post", 
        url: `/user/passport/login`, 
        data:data
    })
}

//获取用户信息【需带token】
const reqUserInfo = ()=>{
    return requests({
        method: "get", 
        url: "/user/passport/auth/getUserInfo"
    })
}

//退出登录
const reqLoginOut = ()=>{
    return requests({
        method: "get", 
        url: "/user/passport/logout"
    })
}

//获取用户地址信息
const reqAddressInfo = ()=>{
    return requests({
        url: "/user/userAddress/auth/findUserAddressList/",
        method: "get" 
    })
}

//获取商品订单
const reqOrderInfo = ()=>{
    return requests({
        url: "/order/auth/trade", 
        method: "get"
    })
}

//提交订单
const reqSubmitOrder = (tradeNo,data)=>{
    return requests({
         url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, 
         data, 
         method: "post" 
    })
}

//获取订单支付信息
const reqPayInof = (orderId)=>{
    return requests({
        url: `/payment/weixin/createNative/${orderId}`, 
        method: "get"
    })
}

//获取支付订单状况
const reqPayStatus = (orderId)=>{
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`, 
        method: 'get'
    })
}

//获取个人中心
const reqMyOrderDetail = (page,limit)=>{
    return requests({
        url: `/order/auth/${page}/${limit}`, 
        method: 'get' 
    })
}
export  {reqCategoryList,reqBannerList,reqFloorList,reqSearchInfo,reqDetailInfo,
        reqAddOrUpdataShopCart,reqGetShopCart,reqUpDataShopCar,reqDelShopCart,
        reqUpdataCheckedType,reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,
        reqLoginOut,reqAddressInfo,reqOrderInfo,reqSubmitOrder,reqPayInof,reqPayStatus,
        reqMyOrderDetail}