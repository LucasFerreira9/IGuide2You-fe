import React,{useCallback, useEffect, useState,useContext} from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import ScreenView from "../../Components/ScreenView";
import ItemUploader from "../../Services/ItemUploader";
import { TError } from "../../Types/TError";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";
import usePreventGoBack from "../../Hooks/usePreventGoBack";
import LottieView from "lottie-react-native";
import { FlatList, StyleSheet, ToastAndroid,View } from "react-native";
import { TextMedium } from "../../Components/Text";
import { UploadItem, UploadItemSet} from "../../Types/Item";
import ItemProgress from "./components/ItemProgress";
import EncryptedStorage from "react-native-encrypted-storage";
import RNFS from 'react-native-fs'
import { useUser } from "../../Providers/UserProvider";
import { UserContextType, UserType } from "../../Types/User";

const SendingData:React.FC<NativeStackScreenProps<RootStackParamList,'ItemUploadScreenParam'>> = ({navigation, route})=>{

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<TError | null>(null);
    const [showError, setShowError] = useState(false);
    const [success, setSucess] = useState(false);
    const [tempError,setTempError] = useState<TError | null>(null)
    const [percentage, setPercentage] = useState<Array<number>>(new Array(route.params.length).fill(0));

    const [animationFinished, setAnimationFinished] = useState(false);

    usePreventGoBack();

    let {user} = useUser()
    user = user as UserType;

    const register = useCallback(async (items: readonly UploadItem[])=>{
        try{
            await new ItemUploader(
                user?.token,
                items,
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
            let saved_upload_items = await EncryptedStorage.getItem("upload_items");
            const upload_items:UploadItemSet = saved_upload_items ? JSON.parse(saved_upload_items) : [];
            for(const item of upload_items){
                try{
                    RNFS.unlink(String(item.photoUri.split('///').pop()));
                    RNFS.unlink(String(item.trainVideoFile.url.split('///').pop()));
                    RNFS.unlink(String(item.videoFile.url.split('///').pop()));
                }
                catch(err){
                    console.warn("cannot delete items: "+err)
                }
                
            }
            EncryptedStorage.removeItem("upload_items");

            setAnimationFinished(true);
            setTimeout(()=>{
                ToastAndroid.show("Estamos processando a criação do item, avisaremos quando estiver concluído",ToastAndroid.LONG);
                navigation.goBack();
            },2000);
        }
    },[animationFinished, navigation]);

    const onFail = useCallback(()=>{
        setTimeout(()=>{
            setError(()=>tempError);
            setShowError(()=>true)
        },1000);
    },[animationFinished, navigation, tempError]);

    const onClickOk = ()=>{
        setError(null);
        setShowError(false);
        navigation.goBack();
    }

    useEffect(()=>{
        register(route.params);
    },[]);

    return (
        <ScreenView style={styles.container}>
            {loading?
                <View style={styles.loading}>

                    <LottieView 
                        source={require('../../Assets/Animations/uploading.json')}
                        style={styles.animation}
                        autoPlay
                        loop
                    />
                    <TextMedium>Fazendo upload de arquivos...</TextMedium>
                    <FlatList
                        style={{width:"100%",marginVertical:"5%"}}
                        data={route.params}
                        renderItem={({item,index})=><ItemProgress item={item} percentage={percentage[index]}/>}
                    />    
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
                        onClickOk={onClickOk}
                    />
                )
            }
           
        </ScreenView>
    )
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

export default SendingData;