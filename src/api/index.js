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
export  {reqCategoryList,reqBannerList,reqFloorList,reqSearchInfo,reqDetailInfo,
        reqAddOrUpdataShopCart,reqGetShopCart,reqUpDataShopCar,reqDelShopCart,
        reqUpdataCheckedType,reqGetCode,reqUserRegister}