import React from "react";
import {StyleSheet,View} from 'react-native';
import Menu from "./Menu";
import useTheme from "../../../../Hooks/useTheme";

const Footer = ()=>{

    const theme = useTheme();
    
    return <View style={{...styles.container,backgroundColor:theme.background}}>
        <Menu/>
    </View>
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    }
});

export default Footer;