import EncryptedStorage from "react-native-encrypted-storage"
import { isTokenValid } from "../Utils/User"
import { UserType } from "../Types/User"
import axios from 'axios'

const LOCAL_HOST = '127.0.0.1:8000'
const SERVER_HOST = '177.221.72.122:8010'

const HOST = LOCAL_HOST

export const BASE_URL = `http://${HOST}`
export const BASE_WEBSOCKET_URL = `ws://${HOST}`


class API{
    private static _instance:axios.AxiosInstance | null = null;
    
    static getInstance():axios.AxiosInstance{
        if(!this._instance){ 
            this._instance = axios.create({
                baseURL: BASE_URL,
            })
            this._instance.interceptors.request.use(async (request)=>{
                const user_context = await EncryptedStorage.getItem('user_context')
                if(user_context){
                    const {token} = JSON.parse(user_context) as UserType
                    request.headers.Authorization = `Bearer ${token}`;
                }
                return request
            })
        }
        
        return this._instance
    }
}


const verifyToken = async (token?:string)=>{
    if(!isTokenValid(token)){
        const user_context = await EncryptedStorage.getItem('user_context') as string
        const user_context_parsed = JSON.parse(user_context) as UserType

        const response = await fetch(`${BASE_URL}/user/token/refresh`,{
            method:'POST',
            body: JSON.stringify({
                refresh: user_context_parsed.refresh
            })
        })
        const {access, refresh} = await response.json()

        user_context_parsed.token = access
        user_context_parsed.refresh = refresh
        token = access
        EncryptedStorage.setItem('user_context',JSON.stringify(user_context_parsed))
    }
    return token
   
}

export default API;