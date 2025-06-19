import { TError} from "../Types/TError";
import { UploadItemSet } from "../Types/Item";
import API from "./API";
import { AxiosError } from "axios";

async function getRepeatedItems(items: UploadItemSet){
    try{
        const api = API.getInstance()
        
        
        const names = [];
        for (const item of items) names.push(item.name);

        const response = await api.post('/getRepeatedItems',{
            names
        });
        
        return response.data
    }
    catch(err){
        if(err instanceof AxiosError && err.response)
            return TError.withCode(err.response.status)
        return TError.ConnectionError();
    }
}

export default getRepeatedItems