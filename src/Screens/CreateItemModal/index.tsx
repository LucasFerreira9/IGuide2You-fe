import React,{createContext, useEffect, useRef, useState} from "react";
import { StyleSheet,View,PanResponder, Pressable} from "react-native";
import colors from "../../Constants/colors";
import useDimensions from "../../Hooks/useDimensions";
import Form from "./components/Form";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import { File } from "../../Types/File";
import { getPostNotificationPermission } from "../../Utils/Permissions";
import { UploadItemSet } from "../../Types/Item";
import EncryptedStorage from "react-native-encrypted-storage";


type Props = NativeStackScreenProps<RootStackParamList,'CreateItem'>

type ContextProps = {
    repeatedName: boolean,
    currentVideo: "VIDEO" | "TRAIN_VIDEO" | "",
    setCurrentVideo: React.Dispatch<React.SetStateAction<"" | "VIDEO" | "TRAIN_VIDEO">>,
    itemName: string,
    setItemName: React.Dispatch<React.SetStateAction<string>>,
    image: File | null,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    video: File | null,
    setVideo: React.Dispatch<React.SetStateAction<File | null>>,
    trainvideo: File | null,
    setTrainVideo: React.Dispatch<React.SetStateAction<File | null>>,
    navigation: NativeStackNavigationProp<RootStackParamList, "CreateItem", undefined>
}

export const CreateItemContext = createContext<ContextProps | undefined>(undefined);

const CreateItemModal:React.FC<Props> = (props)=>{
    const {screen_height} = useDimensions();

    const [itemName, setitemName] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [trainingVideo, setTrainingVideo] = useState<File | null>(null);

    const [currentVideo, setCurrentVideo] = useState<"VIDEO" | "TRAIN_VIDEO" | "">('');
    const [savedItems, setSavedItems] = useState<UploadItemSet>([]);

    const [repeatedName, setRepeatedName] = useState(false);

    useEffect(()=>{
        for(let item of savedItems)
            if(item.name == itemName){
                setRepeatedName(true);
                return
            }
            setRepeatedName(false);
    },[itemName,savedItems]);

    useEffect(()=>{
        getPostNotificationPermission();
    },[])

    useEffect(()=>{
        EncryptedStorage.getItem("upload_items").then(items=>{
            if(items) {
                const saved_items = JSON.parse(items);
                setSavedItems(saved_items);
            }
        });
    },[]);

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
           const distance = gestureState.dy - gestureState.y0
           if(  distance > 0 
                && distance < 0.2 * screen_height 
                && gestureState.y0 < 0.2 * screen_height)
                    props.navigation.goBack();
               
        }    
    })).current

    useEffect(()=>{
        console.log('mudou')
    },[trainingVideo])

    return (
            <View style={{
                    height: screen_height,
                    backgroundColor: 'rgba(0,0,0,0.5)',  
                    justifyContent:'flex-end'
                }}
                {...panResponder.panHandlers}>

                <View style={{
                    height: 0.9 * screen_height,
                    width:'100%',
                    backgroundColor: colors.background,
                    elevation:5,
                    borderTopLeftRadius:20,
                    borderTopRightRadius: 20
                }}>
                    <Pressable 
                        onPress={()=>props.navigation.goBack()} 
                        style={styles.bar}/>
                    <CreateItemContext.Provider value={{
                        repeatedName: repeatedName,
                        currentVideo:currentVideo,
                        setCurrentVideo: setCurrentVideo,
                        itemName: itemName,
                        setItemName: setitemName,
                        image: image,
                        setImage: setImage,
                        video: video,
                        setVideo: setVideo,
                        trainvideo: trainingVideo,
                        setTrainVideo: setTrainingVideo,
                        navigation: props.navigation
                    }}>  
                        <Form/>    
                    </CreateItemContext.Provider>  
                </View>
            </View>   
    )
}

const styles = StyleSheet.create({
    bar:{
        alignSelf:'center',
        height:'1%',
        width:'70%', 
        backgroundColor:'gray',
        marginTop:'3%',
        borderRadius:20
    },
    scrollview:{
        flex:1,
        paddingHorizontal:'5%',
        paddingVertical:'10%'
    }
})

export default CreateItemModal;