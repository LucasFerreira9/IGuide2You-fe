import base64 from 'react-native-base64'
import EncryptedStorage from 'react-native-encrypted-storage'
import { UserType } from '../Types/User'

const isTokenValid = (token?:string)=>{
    const payload = JSON.parse(base64.decode(token?.split('.')[1]))
    const timestamp = Number(payload.exp)
    const currentTimestamp = Math.floor(Date.now() / 1000)
    return currentTimestamp < timestamp
}

async function saveUserContext(userContext: UserType){
    try {
        await EncryptedStorage.setItem(
            "user_context",
            JSON.stringify(userContext)
        );
    } catch (error) {
       console.warn('cannot save user context',error)
    }
}

async function deleteUserContext(){
    try {
        await EncryptedStorage.removeItem('user_context')
    } catch (error) {
       console.warn(error)
    }
}

export {isTokenValid, saveUserContext, deleteUserContext}