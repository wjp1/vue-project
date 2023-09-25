import nprogress from "nprogress"
import "nprogress/nprogress.css"
//对axios进行二次封装
import axios from "axios"
//通过表头，传数据
import store from "@/store"
const requests = axios.create({
    baseURL:'/api',
    //请求超时时间
    timeout:5000
})
//请求拦截器  在发送请求之前，请求拦截器可以检测到，可以在请求发出之前配置
requests.interceptors.request.use((config)=>{
    //config  配置对象，里面有一个属性重要，header请求头
    if(store.state.detail.uid){
        //给请求头添加一个字段
        config.headers.userTempId = store.state.detail.uid
    }

    //将token带给服务器
    if(localStorage.getItem('TOKEN')){
        config.headers.token = localStorage.getItem('TOKEN')
    }
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的调回函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做配置
    nprogress.done()
    return res.data
}),(error)=>{
    //响应失败回调函数
    return Promise.reject(new Error('false'))
}
export default requests