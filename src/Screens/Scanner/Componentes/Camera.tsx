import React,{forwardRef,useImperativeHandle, useRef} from "react";
import { StyleSheet} from "react-native";
import { Camera,Orientation} from 'react-native-vision-camera';
import colors from "../../../Constants/colors";
import { CameraDevice } from "react-native-vision-camera";

type Props = {
    device: CameraDevice,
    isFocused: boolean,
    onCameraInit: ()=>void,
    orientation: Orientation | undefined
}

const MainCamera = forwardRef((props:Props,ref)=>{

    const cameraRef = useRef<Camera>(null);

    // Forward the ref to the parent component
    useImperativeHandle(ref, () => cameraRef.current);

    return (
        <Camera
                ref = {cameraRef}
                style={styles.camera}
                device={props.device}
                photo = {true}
                isActive={props.isFocused}
                onInitialized={props.onCameraInit}
                enableZoomGesture={true}
                enableHighQualityPhotos={true}
                orientation={props.orientation}
        />
    )
});

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: colors.background
    },
    scanline:{
        position:'absolute',
        backgroundColor:'green',
        width: '90%',
        height:6,
    },
    camera:{
        position:'absolute',
        height:'100%',  
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    cameraView:{
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        height:'100%',  
        width:'100%',
        elevation:5
    },
    txt:{
        fontSize:32,
        color:'white',
        position:'absolute',
        top:'10%'
    },
    loadingCameraContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    
});

export default MainCamera;