import { PixelRatio, StyleProp, StyleSheet, TextStyle } from "react-native";
import React, {PropsWithChildren} from "react";
import { Text as RNText } from "react-native";
import colors from "../Constants/colors";

function getFontSize(size:number):number{
    return size / PixelRatio.getFontScale();
}

type Props = {
    color?: string
    bold?: boolean
}


const TextLarge = (props:PropsWithChildren<Props>)=>{
    return (
        <RNText style={{
            ...styles.default,
            color: props.color? props.color : colors.text,
            fontWeight: props.bold ? 'bold' : '500',
            fontSize: getFontSize(21),
        }}>{props.children}</RNText>
    )
}


const TextMedium = (props:PropsWithChildren<Props>)=>{
    
    return (
        <RNText style={{
            ...styles.default,
            color: props.color? props.color : colors.text,
            fontWeight: props.bold ? 'bold' : '300',
            fontSize: getFontSize(17),
        }}>{props.children}</RNText>
    )
}

const Text = (props:PropsWithChildren<Props>)=>{

    return (
        <RNText style={{
            ...styles.default,
            color: props.color? props.color : colors.text,
            fontWeight: props.bold ? 'bold' : '400',
            fontSize: getFontSize(15), 
            opacity:0.8
        }}>{props.children}</RNText>
    )
}

const styles = StyleSheet.create({
    default:{
        fontFamily:'PoppinsMedium',
        textAlign:"justify",
    }   
})

export {TextLarge,TextMedium,Text};