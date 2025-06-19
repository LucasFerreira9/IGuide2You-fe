import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import ScreenView from "../../Components/ScreenView";
import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";
import LottieView from "lottie-react-native";
import { TextMedium } from "../../Components/Text";
import VideoProgress from "./VideoProgress";
import usePreventGoBack from "../../Hooks/usePreventGoBack";
import { TError } from "../../Types/TError";
import VideoUploader from "../../Services/VideoUploader";
import RNFS from 'react-native-fs';
import { UserContextType, UserType } from "../../Types/User";
import { useUser } from "../../Providers/UserProvider";

type Props = NativeStackScreenProps<RootStackParamList, "VideoUploadScreen">;

function ItemUploadScreen({navigation, route}:Props){

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<TError | null>(null);
    const [showError, setShowError] = useState(false);
    const [success, setSucess] = useState(false);
    const [tempError,setTempError] = useState<TError | null>(null)
    const [percentage, setPercentage] = useState<number>(0);

    const [animationFinished, setAnimationFinished] = useState(false);

    usePreventGoBack();

   let {user} = useUser()
   user = user as UserType

    const register = useCallback(async ()=>{
        try{
            await new VideoUploader(
                user.token,
                route.params.item_name,
                route.params.video_uri,
                setPercentage,
            ).upload();
    
            setSucess(true);
        }
        catch(err){
            if(err instanceof TError) 
                setTempError(err);
            
        }
        finally{
            setLoading(false);
        }
    },[]);

    const onSuccess = useCallback(async ()=>{
        if (!animationFinished){
            try{
                RNFS.unlink(String(route.params.video_uri.split('///').pop()))
            }
            catch(err){
                console.warn("cannot delete video: "+err)
            }

            setAnimationFinished(true);
            setTimeout(()=>{
                ToastAndroid.show("vídeo enviado com sucesso",ToastAndroid.LONG);
                navigation.goBack();
            },2000);
        }
    },[animationFinished, navigation]);

    const onFail = useCallback(()=>{
        setTimeout(()=>{
            setError(tempError);
            setShowError(true)
        },2000);
    },[animationFinished, navigation, tempError]);

    const onClickOk = ()=>{
        setError(null);
        setShowError(false)
        navigation.goBack();
    }

    useEffect(()=>{
        register();
    },[]);

    return (
        <ScreenView style={styles.container}>
            {loading ?
                <View style={styles.loading}>

                    <LottieView 
                        source={require('../../Assets/Animations/uploading.json')}
                        style={styles.animation}
                        autoPlay
                        loop
                    />
                    <TextMedium>Fazendo upload de arquivos...</TextMedium>
                    <VideoProgress name={route.params.item_name} percentage={percentage}/>  
                </View>
                :
                success ? 
                    <LottieView 
                        source={require('../../Assets/Animations/success.json')}
                        style={styles.animation}
                        autoPlay
                        loop={false}
                        onAnimationFinish={onSuccess}/>
                    :
                    <LottieView 
                        source={require('../../Assets/Animations/fail.json')}
                        style={styles.animation}
                        autoPlay
                        loop={false}
                        onAnimationFinish={onFail}/>
            }
            {
                showError && error && (
                    <ErrorDialog 
                        message={error}
                        onClickOk={onClickOk}/>
                    )
            }
            
        </ScreenView>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    animation:{
        width: '50%',
        height: '50%'
    },
    loading_status:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    loading:{
        width:"100%", 
        alignItems:"center", 
        
    }
});


export default ItemUploadScreen;