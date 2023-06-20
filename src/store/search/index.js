import { reqSearchInfo } from "@/api"

//search模块仓库
const state={
   //Vuex仓库里面Search的数据
   searchList:{},
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    },
}
const actions={
    //获取Search模块的数据
    async getSearchList(context,value){
        //value是dispatch时传过来的
        let result = await reqSearchInfo(value)
        if(result.code==200){
            context.commit("GETSEARCHLIST",result.data)
        }
    },
}
//getters主要作用：简化仓库中的数据
const getters={
    goodList(state){
        //如果服务器数据回来，可以返回一个数组
        //如果服务器数据没有成功返回，应该返回一个undefined
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}