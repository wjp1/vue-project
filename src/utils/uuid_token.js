import {v4 as uuidv4} from "uuid"

const getUuid = ()=>{
    let uid = localStorage.getItem('uuid_token')
    if(!uid){
        uid = uuidv4()
        localStorage.setItem('uuid_token',uid)
    }
    return uid
}

export default getUuid