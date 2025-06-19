import { BASE_URL } from "./API";
import { TError} from "../Types/TError";

import { UserData } from "../Types/User";

/**
 * 
 * @param {UserData} userData - user information
 * @returns {Promise<null | TError>} - returns null if success, TError case error. 
 */
async function signUp({
    username,
    password,
    email,
    group,
    photo_uri,
    fcm_token
}: UserData): Promise<null | TError>{

    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    formData.append("email", email)
    formData.append("group",group)

    if(photo_uri){
        formData.append('photo',{
            uri: photo_uri,
            name: `${username}.jpeg`,
            type: 'image/jpeg'
        })
    }

    if(fcm_token) formData.append('fcmtoken',fcm_token)

    try{
        const response = await fetch(`${BASE_URL}/signup`,{
            method:'POST',
            body: formData
        });
    
        if(response.ok) return null;

        const json = await response.json()
        if(json.email)
            return new TError("Email Inválido","Insira um email válido")
        
        return new TError("Já existe um usuário com esse nome","Utilize um nome válido")
    }
    catch(err){
        return TError.ConnectionError()
    }

}

export {signUp}