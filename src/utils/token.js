//存储token
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}

//清楚token
export const removeToken = ()=>{
    localStorage.removeItem('TOKEN')
}