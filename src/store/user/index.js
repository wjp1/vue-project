import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLoginOut} from '@/api'
import {setToken,removeToken} from '@/utils/token'
const state = {
    code:'',
    userInfo:''
}
const mutations = {
    CREATECODE(state,code){
        state.code = code
    },

    USERINFO(state,userInfo){
        state.userInfo = userInfo
    },

    CLEARLOGIN(state){
        state.userInfo = {}
        removeToken()
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
    },

    //用户登录
    async UserLogin(context,data){
        let result = await reqUserLogin(data)
        console.log(result);
        if(result.code == 200){
            // context.commit('USERLOGIN',result.data.token)
            setToken(result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error("失败"))
        }
    },

    //获取用户信息
    async userInfo(context){
        let result = await reqUserInfo()
        console.log(result);
        if(result.code == 200){
            context.commit('USERINFO',result.data)
            // localStorage.setItem('TOKEN',result.data.token)
            // setToken(result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error("失败"))
        }
    },

    //退出登录
    async userLogout(context){
        let result = await reqLoginOut()
        console.log(result);
        if(result.code == 200){
            context.commit('CLEARLOGIN')
            return "ok"
        }else{
            Promise.reject(new Error("失败"))
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