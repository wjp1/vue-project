import {reqGetCode,reqUserRegister} from '@/api'
const state = {
    code:''
}
const mutations = {
    CREATECODE(state,code){
        state.code = code
    }
}
const actions = {
    //获取验证码
    async getCode(context,phone){
        let result = await reqGetCode(phone)
        console.log(result);
        if(result.code==200){
            context.commit('CREATECODE',result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("失败"))
        }
    },

    //用户注册
    async userRegsiter(context,user){
        let result = await reqUserRegister(user)
        console.log(result);
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error("失败"))
        }
    }
}
const getters = {

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}