import { TError } from "../Types/TError";
import { File } from "../Types/File";
import { BASE_WEBSOCKET_URL } from "./API";
import RNFS from 'react-native-fs'
import { UploadItem } from "../Types/Item";

const route = "ws/newitem";

const VIDEO_TYPE = {
    video_chunk :"video_chunk",
    train_video_chunk :"train_video_chunk"
}

export default class ItemUploader{
    token: string;
    items: readonly UploadItem[];
    setPercentage: React.Dispatch<React.SetStateAction<Array<number>>>;

    can_send:boolean = true;
    web_socket:WebSocket | undefined = undefined

    CHUNK_SIZE = 4 * 1024 * 1024 //4MB

    bytes = 0
    total_bytes = 0

    index = 0

    constructor(
        token:string,
        items: readonly UploadItem[],
        setPercentage: React.Dispatch<React.SetStateAction<Array<number>>>, 
    ) {
        this.items = items
        this.setPercentage = setPercentage
        this.token = token
    }

    upload = async ()=>{
        try{
            this.web_socket = new WebSocket(`${BASE_WEBSOCKET_URL}/${route}?token=${this.token}`,'ws');
            
            await new Promise((resolve, reject)=>{
                if(this.web_socket){
                    this.web_socket.onmessage = (_)=>{
                        this.can_send = true;
                    }
                    
                    this.web_socket.onerror = (e)=>{
                        console.warn('socket error:' + e.message + '\n\n');
                        this.web_socket?.close(1001,'error');
                        reject(null);
                    };
                
                    this.web_socket.onclose = (e) => {
                        console.log('socket closed: code: ' + e.code + '. reason: ' + e.reason + '\n\n');   
                        resolve(null);
                    };
    
                    this.web_socket.onopen = async ()=>{   
                        for(const item of this.items){
                            this.total_bytes = item.videoFile.size + item.trainVideoFile.size;

                            await this.sendItemName(item.name);
                            await this.sendItemPhoto(item.photoUri);
                            await this.sendVideo(item.videoFile,VIDEO_TYPE.video_chunk);
                            await this.sendVideo(item.trainVideoFile,VIDEO_TYPE.train_video_chunk);

                            
                            this.updateIndex()
                        }
                        
                        this.web_socket?.close(1000)
                        resolve(null);       
                    }   
                }
                else 
                    reject(null);
            });
        }
        catch(e){
            throw TError.ConnectionError();
        }     
    }

    private updateProgress = ()=>{
        let percentage = Math.floor((this.bytes / this.total_bytes) * 100);
        if(percentage > 100) percentage = 100;
        
        this.setPercentage(p=>{
            const new_p = new Array<number>(...p);
            new_p[this.index] = percentage
            return new_p
        });
            
    }

    private updateIndex = ()=>{
        this.bytes = 0;
        this.total_bytes = 0;
        this.index ++;
    }

    private wait = async ()=>{
        while(!this.can_send) await new Promise(resolve=>setTimeout(resolve,1000));
    }

    private sendItemName = async (name:string)=>{
        await this.wait()

        const item_name = {
            stream_type : "item_name",
            data : name
        }
        this.web_socket?.send(JSON.stringify(item_name));    
        this.can_send=false;
    }
        
    private sendItemPhoto = async (uri:string)=>{
        await this.wait()

        const item_photo_base64 = await RNFS.readFile(uri,'base64');
        const item_photo = {
            stream_type : "item_photo",
            data : item_photo_base64
        }
        this.web_socket?.send(JSON.stringify(item_photo));
        this.can_send=false;
    }
    
    private sendVideo = async (video:File, video_stream_type: string)=>{
        let position = 0;
        const size = video.size;
    
        while (position < size){
            await this.wait()
           
            const chunk = await RNFS.read(video.url,this.CHUNK_SIZE,position,'base64')
            this.web_socket?.send(JSON.stringify({
                stream_type : video_stream_type,
                data : chunk
            }));
            position += this.CHUNK_SIZE

            this.bytes += this.CHUNK_SIZE
                
            this.updateProgress();
            this.can_send=false;
        }    
        await this.wait()
    }


    
}



