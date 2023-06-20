import { reqDetailInfo,reqAddOrUpdataShopCart } from "@/api"
import getUuid from "@/utils/uuid_token"

const state = {
    detailList:{},
    uid:getUuid()
}
const mutations = {
    GETDETAILINFO(state,detailList){
        state.detailList = detailList
    }
}
const actions = {
    //得到详情页数据
    async getDetailInfo(context,value){
        let result = await reqDetailInfo(value)
        if(result.code == 200){
            context.commit("GETDETAILINFO",result.data)
        }

    },
    //发送加入购物车请求
    async postShopCartInfo(context,{skuId,skuNum}){
        let result = await reqAddOrUpdataShopCart(skuId,skuNum)
        console.log(result);
        if(result.code == 200){
            return "success"
        }else{
            return Promise.reject(new Error("失败"))
        }
    }
}
const getters = {
    categoryView(state){
        return state.detailList.categoryView || {}
    },
    skuInfo(state){
        return state.detailList.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailList.spuSaleAttrList || []
    },
    skuImageList(state){
        return state.detailList.skuInfo.skuImageList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}