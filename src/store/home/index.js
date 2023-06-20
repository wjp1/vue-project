//home模块仓库
import {reqCategoryList,reqBannerList,reqFloorList} from "@/api/index"

const state={
    //Vuex仓库里面三级列表的数据
    categoryList:[],
    //Vuex仓库里面轮播图的数据
    bannerList:[],
    //Vuex仓库里面floor的数据
    floorList:[]

}
const mutations={
    CATGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
        console.log(state.bannerList);
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions={
    //获取三级列表的数据
    async categoryList(context){
        let result = await reqCategoryList()
        if(result.code==200){
            context.commit('CATGORYLIST',result.data)
        }
    },
    //获取轮播图的数据
    async getBannerList(context){
        let result = await reqBannerList()
        if(result.code==200){
            context.commit('BANNERLIST',result.data)
        }
    },
    //获取floor的数据
    async getFloorList(context){
        let result = await reqFloorList()
        if(result.code == 200){
            //提交mutaion
            context.commit('FLOORLIST',result.data)
            console.log(result.data);
        }
    }
}
const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}