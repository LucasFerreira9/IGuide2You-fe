import React, {PropsWithChildren} from "react";
import {SafeAreaView, ViewStyle} from 'react-native';
import colors from "../Constants/colors";

type Props = {
    style? : ViewStyle
}

const ScreenView = (props:PropsWithChildren<Props>) =>{


    return (
        <SafeAreaView 
            style = {{
                flex:1,
                backgroundColor:colors.background,
                ...props.style
            }}>
            {props.children}
        </SafeAreaView>
    )
};

export default ScreenView;