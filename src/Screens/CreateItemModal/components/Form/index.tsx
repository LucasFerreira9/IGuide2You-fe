import EncryptedStorage from "react-native-encrypted-storage";

import ItemName from "../Fields/ItemName";
import ItemPhoto from "../Fields/ItemPhoto";
import ItemVideo from "../Fields/ItemVideo";
import ItemAIVideo from "../Fields/ItemAIVideo";
import VisualizeItem from "../VisualizeItem";

import { useContext, useEffect, useRef, useState } from "react";
import { Animated, NativeEventEmitter, NativeModules, StyleSheet,  ToastAndroid,  View } from "react-native";
import ProgressBar from "../ProgressBar";

import useDimensions from "../../../../Hooks/useDimensions";
import DefaultButton from "../../../../Components/DefaultButton";
import { Text } from "../../../../Components/Text";
import { CreateItemContext } from "../..";
import ConfirmationDialog from "../../../../Components/Dialogs/ConfirmationDialog";
import { getInfo, renameFile } from "../../../../Utils/FileSystem";


const Form = ()=>{
    const createItemContext = useContext(CreateItemContext);

    const {screen_width} = useDimensions();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);

    const translate = useRef(new Animated.Value(0)).current;


    const onFinished = async ()=>{
        setShowModal(false);

        const saved = await EncryptedStorage.getItem("upload_items");
        const my_items = saved ? JSON.parse(saved) : [];
        my_items.push({
            name: createItemContext?.itemName,
            photoUri: createItemContext?.image?.url,
            videoFile: createItemContext?.video,
            trainVideoFile: createItemContext?.trainvideo
        });
        await EncryptedStorage.setItem("upload_items",JSON.stringify(my_items));

        ToastAndroid.show(
            `Item ${createItemContext?.itemName} pronto para upload`,
            ToastAndroid.LONG
        );

        createItemContext?.navigation.goBack()
    }

    useEffect(()=>{
        Animated.timing(translate,{
            toValue: currentPage,
            useNativeDriver: true,
            duration:500
        }).start()
    },[currentPage]);

    const onFinishedTrim = async (event: any) => {
        const { name, size } = await getInfo(event.outputPath)
        let final_name = name
        let uri = event.outputPath;

        switch(createItemContext?.currentVideo){
            case'VIDEO':{
                final_name = `${createItemContext.itemName}_video.mp4`;
                uri = await renameFile(uri, final_name);
                createItemContext.setVideo({
                    name: final_name,
                    size: size,
                    url: uri
                });
                break;
            }
            case 'TRAIN_VIDEO':{
                console.log('CHEGYEI AKI')
                final_name = `${createItemContext.itemName}_video_treinamento.mp4`;
                uri = await renameFile(uri, final_name);
                createItemContext.setTrainVideo({
                    name: final_name,
                    size: size,
                    url: uri
                })
                break;
            } 
            default: break;  
        }

    }

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
        const subscription = eventEmitter.addListener('VideoTrim', (event) => {
            switch (event.name) {
                case 'onLoad': {
                    // on media loaded successfully
                    console.log('onLoadListener', event);
                    break;
                }
                case 'onShow': {
                    console.log('onShowListener', event);
                    break;
                }
                case 'onHide': {
                    console.log('onHide', event);
                    break;
                }
                case 'onStartTrimming': {
                    console.log('onStartTrimming', event);
                    break;
                }
                case 'onFinishTrimming': {
                    console.log('onFinishTrimming', event);
                    onFinishedTrim(event);
                    break;
                }
                case 'onCancelTrimming': {
                    console.log('onCancelTrimming', event);
                    break;
                }
                case 'onCancel': {
                    console.log('onCancel', event);
                    break;
                }
                case 'onError': {
                    console.log('onError', event);
                    break;
                }
                case 'onLog': {
                    //console.log('onLog', event);
                    break;
                }
                case 'onStatistics': {
                    console.log('onStatistics', event);
                    break;
                }
            }
        });

        return () => {
            subscription.remove();
        };
    },[createItemContext?.currentVideo]);
    
    const pages = [<ItemName/>, <ItemPhoto/>,<ItemVideo/>,<ItemAIVideo/>,<VisualizeItem/>];

    return (
       <View style={styles.container}>
            <View style={styles.header}>
                <Text>{`${currentPage + 1}/${pages.length}`}</Text>
                <ProgressBar percentage={((currentPage + 1) / pages.length)}/>
            </View>
            <Animated.View 
                style={[
                    styles.slideContainer,
                    {transform:[{translateX: translate.interpolate({
                        inputRange:[0,1],
                        outputRange:[0, -screen_width]
                    })}]}
                ]}>
                {pages.map((page,index)=>(
                    <View key = {index} style={{...styles.page,width:screen_width}}>
                        {page}
                    </View>
                ))}
            </Animated.View>
            <View style={styles.buttonsView}>
                <DefaultButton 
                    text={'voltar'} 
                    textSize={16}
                    onPress={
                        currentPage == 0 ? ()=>{createItemContext?.navigation.goBack()}
                        : ()=>setCurrentPage(currentPage-1)}
                    width={'40%'}
                    height={'40%'}
                />
                <DefaultButton 
                    text={currentPage+1 == pages.length ? 'Finalizar' : 'avançar'} 
                    textSize={16}
                    onPress={
                        currentPage+1 == pages.length ? ()=>{setShowModal(true)}
                        :
                        ()=>setCurrentPage(currentPage+1)
                    }
                    
                    width={'40%'}
                    height={'40%'}
                    disabled = {
                        (currentPage == 0 && createItemContext?.itemName=="") ||
                        (currentPage == 0 && createItemContext?.repeatedName) ||
                        (currentPage == 1 && !createItemContext?.image) ||
                        (currentPage == 2 && !createItemContext?.video) ||
                        (currentPage == 3 && !createItemContext?.trainvideo) 
                    }
                />
            </View>
            <ConfirmationDialog 
                question="Deseja finalizar?"
                visible={showModal}
                onPressOk={onFinished}
                onPressCancel={()=>{setShowModal(false)}}
            />
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:'15%',
        alignItems:'center',
    },
    header:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:'10%',
        paddingHorizontal:'5%',
    },
    slideContainer: {
        flexDirection: 'row',
        width:'100%',
        flex:8
    },
    page:{
        width:'100%',
        height:'100%',
        paddingHorizontal:'5%',
    },
    buttonsView:{
        flex:2,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:'5%'

    }
});

export default Form;