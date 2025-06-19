import React, { PropsWithChildren } from "react";
import { StyleProp,  View, ViewStyle } from "react-native";
import DefaultText from "../DefaultText";
import CustomTextInput from "../TextInput";
import useDimensions from "../../Hooks/useDimensions";
import RequiredText from "../RequiredText";

type Props = {
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
    showRequired: boolean
    placeholder: string
    hideText?:boolean
    maxCharacters?: number
    style?: StyleProp<ViewStyle>
    errorText?: string
}

const TextField:React.FC<PropsWithChildren<Props>> = (props)=>{
    const {getFontSize} = useDimensions();

    return (
        <View style={props.style}>
            {props.children && <DefaultText size = {getFontSize(20)} textAlign="justify">{props.children}</DefaultText>}
            <CustomTextInput
                text = {props.text} 
                setText = {props.setText}
                placeholder={props.placeholder}
                hideText={ props.hideText? props.hideText : false}
                maxCharacters={ props.maxCharacters}
            />
            {props.showRequired && (props.text=="") && <RequiredText/>}
            {props.errorText && <RequiredText>{props.errorText}</RequiredText>}
        </View>
    )
}

export default TextField;