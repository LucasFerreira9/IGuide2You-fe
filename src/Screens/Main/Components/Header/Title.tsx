import React, {PropsWithChildren} from "react";
import {Text,StyleSheet} from 'react-native';

const TextLarge = (props:PropsWithChildren) =>{
    return <Text style={styles.text}>{props.children}</Text>
};

const styles = StyleSheet.create({
    text:{
        color:'white',
        fontSize:24,
        fontFamily:'PoppinsSemiBold',
        textAlignVertical:'center',
        textShadowOffset: {width:5,height:5},
        textShadowRadius:10,
    }
})

export default TextLarge;

