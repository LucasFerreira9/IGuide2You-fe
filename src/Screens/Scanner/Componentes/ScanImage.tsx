import React,{useCallback, useEffect, useRef} from 'react';
import {View,StyleSheet,TouchableOpacity,Animated,Alert, ActivityIndicator} from 'react-native';
import {Camera, Orientation} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Feather';
import { setUpdateIntervalForType, SensorTypes,accelerometer } from "react-native-sensors";


setUpdateIntervalForType(SensorTypes.accelerometer, 1000);

type props = {
    disabled: boolean
    cameraRef: React.RefObject<Camera>
    setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>
    orientation: Orientation | undefined
    setOrientation: React.Dispatch<React.SetStateAction<Orientation | undefined>>
}

const ScanImage:React.FC<props> = ({disabled,cameraRef, setImageUrl, orientation, setOrientation})=>{

   const rotation = useRef(90);

   const spinValue = useRef(new Animated.Value(0)).current

   const spin = spinValue.interpolate({
   inputRange: [0, 90],
    outputRange: ['0deg', '-90deg']
   })

   const animateRotationLandscape = useCallback(()=>{
        Animated.timing(spinValue,{
            toValue: 90,
            duration: 500,
            useNativeDriver: true
        }).start();
   },[]);

   const animateRotationPortrait = useCallback(()=>{
        Animated.timing(spinValue,{
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    },[]);

    const onHelpPress = useCallback(()=>{
        Alert.alert(
            "Instruções de uso:",
            "1 - Utilize o botão do canto inferior direito para alternar entre o modo de foto retrato e paisagem. \n\n" +
            "2 - Aponte a câmera para o objeto ou ponto de interesse e clique no botão central para escanear a imagem. \n\n" +
            "3 - Aguarde a detecção da imagem.",
            [{
                text : "entendi"
            }])
    },[]);

    const onScannerPress = async ()=>{
        if(cameraRef.current){    
            const photo = await cameraRef.current.takePhoto({
                //qualityPrioritization: 'quality',
                flash: 'off',
                enableShutterSound: false,
                
            }); 
                
            setImageUrl(`file://${photo.path}`);  
        }   
    }

    useEffect(()=>{
        const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
            
            let roll = Math.atan2(-y, -x) * 180 / Math.PI;

            if(Math.abs(roll) > 40 && Math.abs(roll) < 140){
                setOrientation('portrait')
                animateRotationPortrait()
            }  
            else if(Math.abs(roll) <= 40){
                setOrientation('landscape-right')
                animateRotationLandscape()
            }
            else{
                setOrientation('landscape-left')
                animateRotationLandscape()
            }
        });

        return ()=>subscription.unsubscribe()

    },[rotation]);

   return <View style = {styles.container}>

        <TouchableOpacity style = {styles.helpBtn} onPress={onHelpPress}>
            <Icon name = "help-circle" size = {50} color = {'white'}/>
        </TouchableOpacity>

        {disabled ? <ActivityIndicator size={50} color={'white'}/> : <TouchableOpacity style= {styles.Pressable} disabled={disabled} onPress={onScannerPress}>
        </TouchableOpacity>}

        <View style={styles.orientationIcon}>
            <Animated.Image source={require('../../../Assets/phone.png')} 
            style={{transform: [{rotate:spin}],width:50,height:50 }}/>
        </View>
   </View>
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        top: '88%',
        height: '10%',
        width:'94%',  
        backgroundColor: 'rgba(0,0,0,0.3)', 
        borderRadius:30,
        paddingHorizontal:'4%',
        
    },
    Pressable:{
        backgroundColor:'white',
        borderRadius:100,
        elevation:5,
        width:'18%',
        height:'80%',
        borderColor:'gray',
        borderWidth:5,

    },
    orientationIcon:{
        backgroundColor:'white',
        borderRadius:100,
        width:50,
        height:50,
    },
    helpBtn:{
        elevation:5
    }
});

export default ScanImage;