import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import colors from "../../../Constants/colors";
import useDimensions from "../../../Hooks/useDimensions";

type props = {
    percentage: number
}

const ProgressBar:React.FC<props> = ({percentage})=>{
    const progress = useRef(new Animated.Value(0)).current;
    const {screen_width, screen_height} = useDimensions();

    const bar_width = 0.8 * screen_width;

    useEffect(()=>{
        Animated.timing(progress, {
            toValue: percentage,
            duration: 500,
            useNativeDriver:false
        }).start();
    },[percentage])

    return (
        <View style={{
            width: bar_width, 
            height:0.02 * screen_height,
            backgroundColor: colors.bar,
            borderRadius: 10,
            }}>
            <Animated.View style={{
                borderRadius: 10,
                position:'absolute',
                backgroundColor:colors.default, 
                width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, bar_width],
                }),
                height:'100%'}}
            />
        </View>
    )
}

export default ProgressBar;