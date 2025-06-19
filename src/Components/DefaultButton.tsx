import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "../Constants/colors";
import { TextMedium } from "./Text";

type Props = {
    text:string,
    textSize: number,
    onPress: ()=>void,
    disabled?: boolean,
    width: number | `${number}%`,
    height: number | `${number}%`,
    
    
}

const DefaultButton:React.FC<Props> = ({text,textSize,onPress,disabled,...props})=>{

    return (
        <TouchableOpacity 
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: disabled ? 'gray' : colors.default,
                justifyContent:'center',
                alignItems:'center',
                borderRadius: 50,
                elevation: 4,
                borderWidth:0.8,
                borderColor:'gray',
                ...props
            }}>
            <TextMedium color={'white'}>{text}</TextMedium>
        </TouchableOpacity>
    )
}

export default DefaultButton;