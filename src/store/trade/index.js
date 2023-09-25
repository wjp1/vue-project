import {reqAddressInfo,reqOrderInfo} from "@/api"

const state = {
    address:[],
    orderList:{}
}
const mutations = {
    ADDRESSINFO(state,address){
        state.address = address
    },
    ORDERINFO(state,orderList){
        state.orderList = orderList
    }
}
const actions = {
    //获取用户地址信息
    async addressInfo(context){
        let result = await reqAddressInfo()
        console.log(result);
        if(result.code == 200){
            context.commit('ADDRESSINFO',result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("失败"))
        }
    },

    //获取商品订单
    async orderInfo(context){
        let result = await reqOrderInfo()
        console.log(result);
        if(result.code == 200){
            context.commit('ORDERINFO',result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("失败"))
        }
    }
}
const getters = [

]

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}