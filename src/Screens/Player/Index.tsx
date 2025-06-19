import React,{useRef,useState} from "react";
import {View,StyleSheet, Dimensions} from "react-native";
import Video from 'react-native-video';
import VideoRef from "react-native-video";

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from "../../Navigation";
import Controls from "./Components/Controls";
import colors from "../../Constants/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Player">;

const Player = ({route}:Props)=>{

    const videoRef = useRef<VideoRef>(null);

    const [paused,setPaused] = useState<boolean>(false);
    const [currentTime,setCurrentTime] = useState<number>(0.0);
    const [totalTime,setTotalTime] = useState<number>(0.0);

    return (
        <View style={{...styles.video,backgroundColor:colors.background}}>
            <Video 
                source={{
                    uri: route.params.url,
                    type: 'video/mp4'
                }}  
                ref={videoRef}
                // Callback when remote video is buffering                                      
                //onBuffer={onBuffer}
                // Callback when video cannot be loaded              
                onError={(err)=>console.log(err.error)}  
                onProgress={(progress)=>{
                    setCurrentTime(progress.currentTime);
                }}
                
                onLoad={(data)=>{
                    setTotalTime(data.duration);
                }}  
                onEnd={()=>{
                    setCurrentTime(0.0);
                    videoRef.current?.seek(0.0);
                    setPaused(true);
                }}         
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0, 
                }}
                resizeMode={'contain'}
                controls = {false}
                fullscreenOrientation="portrait"
                fullscreen={true}
                paused={paused}

            />
            <Controls 
                paused={paused} 
                setPaused={setPaused} 
                currentTime={currentTime}
                totalTime={totalTime}
                videoRef={videoRef}/>
        </View>
    ) 
    
}

const styles = StyleSheet.create({
    video:{
        position:'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

export default Player;