import React, { useCallback, useContext } from 'react';
import { useState,useEffect,useRef } from 'react';
import { StyleSheet,Text,View,AppState,Image, ActivityIndicator} from 'react-native';
import { getCameraPermission } from '../../Utils/Permissions';
import { Camera,useCameraDevice, Orientation} from 'react-native-vision-camera';
import ScanImage from './Componentes/ScanImage';
import CameraOut from './Componentes/CameraOut';
import * as RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../Navigation';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../Constants/colors';
import ErrorDialog from '../../Components/Dialogs/ErrorDialog';
import ScreenView from '../../Components/ScreenView';
import DefaultText from '../../Components/DefaultText';
import { predict } from '../../Services/predict';
import { TError } from '../../Types/TError';
import { UserType } from '../../Types/User';
import { useUser } from '../../Providers/UserProvider';

const Scanner = ()=>{
  const navigation = useNavigation<StackTypes>();
  const [hasCameraPermission,setCameraPermission] = useState<boolean>(false);
  const device = useCameraDevice('back');
  const isActive = useIsFocused();
  const [loadingCamera,setLoadingCamera] = useState(true);

  const [orientation,setOrientation] = useState<Orientation | undefined>('portrait');
  const [photo_url,setPhotoUrl] = useState<string>();
  const [analysing,setAnalysing] = useState<boolean>(false);
  const [text,setText] = useState<String>(" ");
  const [canvaColor,setCanvaColor] = useState('white');
  const cameraRef = useRef<Camera>(null);

  const [showDetectionError, setShowDetectionError] = useState<boolean>(false);
  const [error, setError] = useState<TError | null>(null);

  let {user} = useUser();
  user = user as UserType

  const onCameraInit = useCallback(()=>{
    setLoadingCamera(false);
  },[]);

  useEffect(()=>{
    const detect = async ()=>{
        if(!photo_url) return;

        setAnalysing(true);
        setText("Analisando imagem...");

        const result = await predict(photo_url,user.token)

        setAnalysing(false);
        setText("");
        setPhotoUrl("");
         //deleting photo from storage
        try{
            RNFS.unlink(String(photo_url.split('///').pop()));
        }
        catch(err){
            console.warn(err);
        }   

        if(result instanceof TError) {
            setError(result)
            setShowDetectionError(true)
        }
        else navigation.navigate('ItemViewer',result);
        
    }
    detect();
  },[photo_url]);

  useEffect(()=>{
    getCameraPermission().then(response=>{
        setCameraPermission(response);
    });
  },[]);

  
  useEffect(()=>{
    const subscription = AppState.addEventListener('focus',()=>{
        getCameraPermission().then(response=>{
            setCameraPermission(response);
        });
        setCanvaColor('white');
        setText("");

        
    });

    return ()=>{subscription.remove()}
  },[]);

  return (
        !hasCameraPermission ? 
        <CameraOut/> : 
        (!device) ? 
        <View style={styles.loadingCameraContainer}>
            <ActivityIndicator size = {60} color = {colors.main1}/>
            <Text>Carregando camera</Text>
        </View> :
        <ScreenView style={styles.container}>
            <View style={styles.cameraView}>
            {!photo_url ? <Camera
                ref = {cameraRef}
                style={styles.camera}
                device={device}
                photo = {true}
                isActive={isActive}
                onInitialized={onCameraInit}
                enableZoomGesture={true}
                enableHighQualityPhotos={true}
                orientation={orientation}

            /> : 
            <Image 
                source={{uri: photo_url}} 
                style={styles.camera} 
                resizeMode='stretch'/>}
            </View>
            <DefaultText color='white' size={22}>{text}</DefaultText>
            <ScanImage  
                disabled = {analysing || showDetectionError}
                cameraRef = {cameraRef} 
                setImageUrl = {setPhotoUrl}
                orientation = {orientation}
                setOrientation = {setOrientation}
            />
            
            {
                showDetectionError && (
                    <ErrorDialog 
                        message = {error}
                        onClickOk = {()=>{setShowDetectionError(false);}}
                    /> 
                )   
            }
            
            
        </ScreenView>     
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
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
    loadingCameraContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    
});



export default Scanner;