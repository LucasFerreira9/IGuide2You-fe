import React, {PropsWithChildren} from "react";
import {Text,StyleSheet} from 'react-native';
import colors from "../Constants/colors";
import useDimensions from "../Hooks/useDimensions";

type Props = {
    color?: string,
    size?: number,
    textAlign?: "auto" | "center" | "left" | "right" | "justify" | undefined
    fontWeight?: "100" | "bold" | "800" | "normal" | "200" | "300" | "400" | "500" | "600" | "700" | "900" | undefined
}

const DefaultText = (props:PropsWithChildren<Props>) =>{

    const {getFontSize} = useDimensions()

    return <Text 
        style={{...styles.text,
                color: props.color ? props.color : colors.text,
                fontSize: props.size ? getFontSize(props.size) : getFontSize(15),
                textAlign: props.textAlign ? props.textAlign : 'center',
                fontWeight: props.fontWeight ? props.fontWeight : '600'
            }}>
            {props.children}
    </Text>
};

const styles = StyleSheet.create({
    text:{
        textAlignVertical:'center',
        fontFamily:'PoppinsMedium',
    }
})

export default DefaultText;