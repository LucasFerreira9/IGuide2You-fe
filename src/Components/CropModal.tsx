import React, { useState } from "react";
import { StyleSheet, View,Image, TouchableOpacity, Dimensions, LayoutChangeEvent } from "react-native";
import Dialog from "./Dialogs/Components/Dialog";
import { Text } from "./Text";

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
    useSharedValue,
    useAnimatedStyle,
    clamp
} from 'react-native-reanimated';
//import RNPhotoManipulator from 'react-native-photo-manipulator';

const screen_width = Dimensions.get('screen').width;
const screen_height = Dimensions.get('screen').height; 


type Props = {
    uri: string,
    visible: boolean,
    onPressOk: (croped_image:string)=>void,
    onPressCancel: ()=>void
}

const CropModal:React.FC<Props> = ({uri,visible, onPressOk, onPressCancel})=>{

    const [photoDims, setPhotoDims] = useState<{width:number, height: number}>({width:0, height: 0});
    const [crop_window_size, setCropWindowSize] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 });

    const scale = useSharedValue(1);
    const start_scale = useSharedValue(1);

    const pinch = Gesture.Pinch()
        .onStart(()=>{
            offset.value = { x: 0, y: 0 }
            start.value = { x: 0, y: 0 }
        })
        .onUpdate((e)=>{   
            scale.value = e.scale * start_scale.value;       
        })
        .onEnd(()=>{
            start_scale.value = scale.value
        });

    const pan = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true;
        })
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        })
        .onFinalize(() => {
            isPressed.value = false;
    });

    const animatedStyles = useAnimatedStyle(() => {
        if(photoDims && crop_window_size)
            return {
                transform: [
                    { translateX: 
                        clamp(
                            offset.value.x, 
                            - ((photoDims.width - (crop_window_size * scale.value)) / 2), 
                            (photoDims.width - (crop_window_size * scale.value)) / 2
                        )
                    },
                    { translateY: 
                        clamp(
                            offset.value.y, 
                            -((photoDims.height - (crop_window_size * scale.value)) / 2), 
                            (photoDims.height - (crop_window_size * scale.value)) / 2
                        )
                    },
                    { scale: 
                        clamp(
                            scale.value,
                            0.5,
                            Math.min(
                                photoDims.width / crop_window_size,
                                photoDims.height / crop_window_size,
                            )
                        )
                    }
                ],
            };
        else return {}
    });

    const onLayout = (event:LayoutChangeEvent)=>{
        const { width, height } = event.nativeEvent.layout;

        Image.getSize(uri,(w, h)=>{
            const w_diff = width - w
            const h_diff = height - h
            
            let fact
            if(w_diff < h_diff)
                fact = width / w;
            else 
                fact = height / h;

            setPhotoDims({width: w * fact, height: h*fact})
            setCropWindowSize(Math.min(0.7 * w * fact, 0.7 * h * fact))
            setLoading(false);
            
        })
    }

    const onSave = ()=>{ 
        Image.getSize(uri, async (width, height)=>{
            let window_size = crop_window_size * scale.value
            let x = (photoDims.width / 2) + start.value.x - (window_size / 2)
            let y = (photoDims.height / 2) + start.value.y - (window_size / 2)

            x = x * width / photoDims.width
            y = y * height / photoDims.height
            window_size = window_size * Math.min(height, width) / Math.min(photoDims.height, photoDims.width)

            if(x<0) x = 0
            if(y<0) y = 0

            const cropRegion = { x: x , y: y , height: window_size, width: window_size };
            const targetSize = { height: window_size, width: window_size };

            //const result = await RNPhotoManipulator.crop(uri, cropRegion, targetSize)
            
            //onPressOk(result)
        })   
    }

    return (
        <Dialog visible={visible}>
            <View style={{...styles.container,backgroundColor:'#000000'}}>
           
            <View style={styles.cropView}>
               <Image 
                   source={{uri: uri}} 
                   style={{width:'100%',height:'100%'}} 
                   resizeMode="contain"
                   onLayout={onLayout}/>
            </View>

            {!loading && (
                <>
                    <GestureDetector gesture={Gesture.Simultaneous(pinch,pan)}>
                        <Animated.View style={[
                        {
                            ...styles.cropWindow,
                            width: crop_window_size,
                            height: crop_window_size,
                        }
                        ,animatedStyles]}/>       
                    </GestureDetector>
                
            
                    <View style={styles.options}>
                        <TouchableOpacity onPress={onPressCancel}>
                            <Text color='#FFFFFF'>cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSave}>
                            <Text color='#FFFFFF'>salvar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            
       </View>
        </Dialog>
    )
    
};

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height: screen_height,
        width: screen_width,
    },
    cropView:{
        position:'absolute',
        width: screen_width,
        height: 0.7 * screen_height,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    cropWindow: {
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.4)',
        borderWidth:2,
        borderColor:'#FFFFFF',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    options:{
        top: '80%',
        position:'absolute',
        height:'20%',
        width:'80%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        verticalAlign:'bottom'
    }
})

export default CropModal;