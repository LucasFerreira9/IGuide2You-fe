import React,{useCallback,useState,useEffect} from "react";
import {StyleSheet, View,TouchableOpacity,Text,TouchableHighlight,PanResponder, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../../Constants/colors";
import Video from 'react-native-video';

type Props = {
    paused:boolean,
    setPaused:React.Dispatch<React.SetStateAction<boolean>>,
    currentTime:number,
    totalTime: number,
    videoRef: React.RefObject<Video>
};

const screen_width = Dimensions.get('screen').width;

const Controls:React.FC<Props> = ({paused,setPaused,currentTime,totalTime,videoRef})=>{

    const [progress,setProgress] = useState('');

    useEffect(()=>{
        setProgress(`${(currentTime / totalTime * 100) - 6}%`)
    },[currentTime]);

    const panResponder = 
        PanResponder.create({
            onMoveShouldSetPanResponder: ()=>true,
            onPanResponderGrant: () => {
                setPaused(true);
            },
            onPanResponderRelease: ()=>{
                setPaused(false);
            },
            onPanResponderMove: (event,gestureState) =>{
                const percentage = gestureState.moveX / (screen_width*0.9);
                const seek = totalTime * percentage;
                videoRef.current?.seek(seek);
                setProgress(`${percentage * 100 - 6}%`);
            }
    });
    
    const onPause = useCallback(()=>{
        setPaused(paused=>!paused);
    },[]);

    const onForward = useCallback(()=>{
        videoRef.current?.seek(currentTime + 10);
    },[currentTime]);

    const onBackward = useCallback(()=>{
        videoRef.current?.seek(currentTime - 10);
    },[currentTime]);

    return <View style={styles.container}>
        <View {...panResponder.panHandlers} style={styles.progressView} >
            <View style={{...styles.progressBar,width: progress}}>
            </View>
            <View style={styles.pointer}></View>
        </View>
        <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
                {`${Math.floor(currentTime/60)}:${Math.trunc(currentTime%60)}`}</Text>
            <Text style={styles.timeText}>
                {`-${Math.floor((totalTime - currentTime)/60)}:${Math.trunc((totalTime - currentTime)%60)}`}</Text>
        </View>
        <View style={styles.controlContainer}>
            <TouchableOpacity onPress={onBackward}>
                <Icon name = 'backward' size={35} color={colors.main2}/>
            </TouchableOpacity>
            <TouchableHighlight style={styles.pauseBtn} onPress = {onPause}>
                <Icon name = {paused? 'play' : 'pause'} size={45} color={colors.main3}/>
            </TouchableHighlight>
            <TouchableOpacity onPress={onForward}>
                <Icon name = 'forward' size={35} color={colors.main2}/>
            </TouchableOpacity>
        </View>
        
    </View>
};

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        height:'15%',
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        top:'85%',
        backgroundColor: 'rgba(0,0,0,0.7)', 
    },
    progressView:{
        width:'90%',
        height: '8%',
        backgroundColor: '#808080',
        justifyContent:'flex-start',
        alignItems:'center',
        borderRadius:30,
        flexDirection:'row',
    },
    progressBar:{
        height: '100%',
        backgroundColor:'white',
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        justifyContent:'flex-end',
        flexDirection:'row',
        alignItems:'center'
    },
    timeContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',
        marginTop:5
    },
    controlContainer:{
        flexDirection:'row',
        justifyContent:'center',
        width:'90%',
        alignItems:'center',
    },
    pauseBtn:{
        marginHorizontal:'10%',
    },
    timeText:{
        fontWeight:'500',
        color:'white'
    },
    pointer:{
        backgroundColor:'white',
        borderRadius:40,
        width:'6%',
        height:'200%'
    }
    
});

export default Controls;