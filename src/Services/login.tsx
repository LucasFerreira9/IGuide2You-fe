import { BASE_URL } from "./API";
import { TError} from "../Types/TError";
import { UserCredentials, UserType } from "../Types/User";

/**
 * 
 * @param {UserCredentials} 
 * @returns {Promise<UserType | TError>} 
 */
async function login({username, password}: UserCredentials):Promise<UserType | TError>{

    const formData = new FormData()
    formData.append("username",username)
    formData.append("password", password)

    try{
        const response = await fetch(`${BASE_URL}/user/token`,{
            method:'POST',
            body: formData
        });

        if(!response.ok)
            return new TError("Usuário ou senha incorretos","Insira dados válidos")

        const {access, refresh, user} = await response.json()
        
        const username = user.username
        const group = user.group 
        const photo_uri = user.photo_uri
        
        return {
            username, group, photo_uri, token:access, refresh
        }
    }
    catch(err){
        console.warn(err)
        return TError.ConnectionError()
    }
}


export {login}