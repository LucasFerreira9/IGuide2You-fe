import React, { useCallback } from "react";
import { TextInput } from "react-native";
import colors from "../Constants/colors";
import useDimensions from "../Hooks/useDimensions";


type Props = {
    text: string,
    setText : React.Dispatch<React.SetStateAction<string>>
    placeholder: string,
    hideText: boolean,
    maxCharacters?: number
}

const CustomTextInput:React.FC<Props> = ({setText,text,placeholder,hideText,maxCharacters})=>{

    const {getFontSize} = useDimensions();
    

    const onChangeText = useCallback((text:string)=>{
        setText(text);
    },[]);

    return <TextInput
        style={{
            fontSize : getFontSize(20),
            borderBottomWidth:2.6,
            borderBottomColor: colors.main3,
            backgroundColor: colors.background,
            color: colors.text
        }}
        onChangeText={onChangeText}
        disableFullscreenUI={true}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        secureTextEntry={hideText}
        maxLength={maxCharacters}
    />
};


export default CustomTextInput;