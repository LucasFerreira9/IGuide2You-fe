import React from "react";
import {TouchableOpacity,Image,StyleSheet,View} from 'react-native';
import { getThemeColor,getMainColor } from "../../../../Constants/colors";

type props={
    onPress: ()=>void
}

const ScanButton = ({onPress}:props)=>{
    return <View style={styles.container}>
        <TouchableOpacity 
            style={styles.btn}
            onPress = {onPress}>
            <Image source={require('../../../../Assets/ScanBtn.png')} style={styles.img}/>
        </TouchableOpacity>
        </View>
};

const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:'100%',
        resizeMode:'contain',
    },
    btn:{
       width:'34%',
       height:'100%',
       marginVertical:'10%',
       //backgroundColor:'red',
       position:'absolute'
    },
    container:{
        flex:1,
        width:'95%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: getMainColor().main3,
        borderRadius:7,
        marginVertical:'8%',
        elevation:2
    }
});

export default ScanButton;