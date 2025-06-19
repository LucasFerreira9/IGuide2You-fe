import { TError } from "../Types/TError";
import { File } from "../Types/File";
import {BASE_WEBSOCKET_URL } from "./API";
import RNFS from 'react-native-fs'

const route = "ws/newVideo";

export default class VideoUploader{
    token:string
    item_name: string
    video_uri: string;
    setPercentage: React.Dispatch<React.SetStateAction<number>>;

    can_send:boolean = true;
    web_socket:WebSocket | undefined = undefined

    CHUNK_SIZE = 4 * 1024 * 1024 //4MB


    constructor(
        token: string,
        item_name: string,
        video_uri: string,
        setPercentage: React.Dispatch<React.SetStateAction<number>>, 
    ) {
        this.item_name = item_name
        this.video_uri = video_uri
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
                        if(e.code != 1000) reject(null)
                            
                        resolve(null);
                    };
    
                    this.web_socket.onopen = async ()=>{   

                        await this.sendItemName()
                        await this.sendVideo()
                        
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

    private wait = async ()=>{
        while(!this.can_send) await new Promise(resolve=>setTimeout(resolve,1000));
    }

    private sendItemName = async ()=>{
        await this.wait()

        this.web_socket?.send(JSON.stringify({
            item_name : this.item_name
        }));    
        this.can_send=false;
    }
        
    private sendVideo = async ()=>{
        let position = 0;
        const video_info = await RNFS.stat(this.video_uri)
        const size = video_info.size;
    
        while (position < size){
            await this.wait()
           
            const chunk = await RNFS.read(this.video_uri,this.CHUNK_SIZE,position,'base64')
            this.web_socket?.send(JSON.stringify({
                video_chunk : chunk
            }));
            position += this.CHUNK_SIZE;

            let percentage = position / size * 100;
            if(percentage > 100) percentage = 100;
            this.setPercentage(percentage)
            
            this.can_send=false;
        }    
        await this.wait()
    }


    
}



