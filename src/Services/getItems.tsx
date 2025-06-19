import { TError} from "../Types/TError";
import { ItemsSet } from "../Types/Item";
import API from "./API";
import { AxiosError } from "axios";

/**
 * 
 * @returns {Promise | TError} - returns the user's set of items   
 */
async function getItems():Promise<ItemsSet | TError >{
    try{
        const api = API.getInstance()
        const response = await api.get('/getItems')
        
        return response.data
    }
    catch(err){
        if(err instanceof AxiosError && err.response){
            return TError.withCode(err.response.status)
        }
        return TError.ConnectionError()
    }

}

export {getItems}