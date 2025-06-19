import { TError} from "../Types/TError";
import { BASE_URL } from './API';

export type DetectionResponse = {
    name: string;
    coords: string;
    image: string;
    videos: Array<{
        owner:string, 
        owner_photo_url: string
        video_url:string,
        created: string,
        likes: number,
        deslikes: number
    }>
}

/**
 * 
 * @param {string} photo_url  - image URL in device memory
 * @returns {DetectionResponse | TError} - returns the set of videos related to the object detected in the image
 */
async function predict(photo_url:string, token?:string): Promise<DetectionResponse | TError >{
    
    try{
        const formdata = new FormData();
        formdata.append('image',{
            uri: photo_url,
            name: `image.jpeg`,
            type: 'image/jpeg'    
        });

        const response = await fetch(BASE_URL + "/predict",{
            headers:{
                'Authorization': `Bearer ${token}`
            },
            method:'POST',
            body: formdata,
        });

        if(response.ok){
            const json = await response.json();
            const {recognized,...result} = json;
            if(recognized == 'ok'){
                console.log(result);
                return result;
            }
            else
                return new TError(
                    'Não foi possível reconhecer a imagem',
                    "Se você tem certeza que esse elemento está registrado, procure mudar o ângulo e proximdiade da sua foto" 
                )
            
        }
        else
            return TError.withCode(response.status);
        
        
    }
    catch(err){
        console.warn(err)
        return TError.ConnectionError()
    }
  
}


async function localModelPredict(){
     /*
        ***Local model detection***

        let prediction = DetectorModule.detect(photo_url);

        prediction = prediction.split(',');
        let greater = -1;
        let pos = -1;
        for(let i=0;i < prediction.length;i++){
            if(parseFloat(prediction[i]) > greater){
                greater = parseFloat(prediction[i]);
                pos = i;
            }
        }

        console.log(prediction);
        setAnalysing(false);

        //verify unknoun class
        if(greater < 0.85){
            setText("");
            setCanvaColor('red');
            await showErrorAlert();
            setCanvaColor('white');
        }
        else{
            setText(items[pos].getName());
            setCanvaColor('green');
            await new Promise(resolve=>setTimeout(resolve,1000));
            navigation.navigate("Player",{url: items[pos].getUrl()});
        }


        //deleting photo from storage
        try{
            RNFS.unlink(String(photo_url.split('///').pop()));
        }
        catch(err){
            console.warn(err);
        }

        setPhotoUrl("");
        */
}


export {predict}