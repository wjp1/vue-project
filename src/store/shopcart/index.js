import {reqGetShopCart,reqUpDataShopCar,reqDelShopCart,reqUpdataCheckedType} from "@/api/index"
const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    //得到购物车数据
    async getShopCart(context){
        let result = await reqGetShopCart()
        if(result.code == 200){
            console.log(result);
            context.commit('GETCARTLIST',result.data)
        }
    },
    //修改购物车物品个数
    async UpDataShopCar(context,{skuId,skuNum}){
        let result = await reqUpDataShopCar(skuId,skuNum)
        if(result.code == 200){
            console.log(result);
            return "ok"
        }else{
            return Promise.reject(new Error("失败"))
        }
    },
    //删除购物车物品
    async delShopCart(context,skuId){
        console.log(context);
        let result = await reqDelShopCart(skuId)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("失败"))
        }
    },
    //修改购物车选中或未选中
    async updataCheckedType(context,{skuId,isChecked}){
        let result = await reqUpdataCheckedType(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error("失败"))
        }
    },
    //删除选中的购物车物品
    deleteisChecked(context){
        console.log(context);
        let promiseAll = []
        context.getters.cartList.cartInfoList.forEach(item => {
            //这里不采用for循环
            //改用Promise.all,当返回的promise值都为成功时，Promise.all才会返回成功
           if(item.isChecked == 1){
               let promise =  context.dispatch("delShopCart",item.skuId)
               promiseAll.push(promise)
           }
        });
        console.log(Promise.all(promiseAll));
        return Promise.all(promiseAll)
    },
    //修改全部产品的状态
    upDataAllCartType(context,isChecked){
        let promiseAll = []
        context.state.cartList.forEach((item)=>{
            item.cartInfoList.forEach((item2)=>{
                let promise = context.dispatch('updataCheckedType',{skuId:item2.skuId,isChecked})
            promiseAll.push(promise)
            })
        })
        console.log(Promise.all(promiseAll));
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}