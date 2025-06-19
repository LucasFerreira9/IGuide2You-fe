import { TError } from "../Types/TError";
import API from "./API";

async function deleteUser():Promise<null|TError>  {
    try{
        const api = API.getInstance()
        const response = await api.delete('/user/delete')
        
        if(response.status != 200) return TError.withCode(response.status)
        
        return null
    }
    catch(err:any){
        if(err.response) return TError.withCode(err.response.status);

        return TError.ConnectionError()
    }
   
}

export default deleteUser;