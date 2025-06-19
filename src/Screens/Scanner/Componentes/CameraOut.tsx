import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View,StyleSheet,Pressable,Linking} from 'react-native';
import DefaultText from "../../../Components/DefaultText";
import colors from "../../../Constants/colors";

const CameraOut = ()=>{
    return (
        <View style = {styles.container}>
            <DefaultText>O aplicativo não tem permissão para usar a camera</DefaultText>
            <Icon name='camera-off' size={70} style={styles.icon}/>
            <View>
                <Pressable 
                    style = {styles.ActiveBtn}
                    onPress = {()=>Linking.openSettings()}>
                    <DefaultText>ativar</DefaultText>
                </Pressable>
            </View>
         </View>
    )   
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.background,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:8
    },
    ActiveBtn:{
        backgroundColor: colors.background,
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:7,
        elevation: 4
    },
    icon:{
        marginVertical:20
    }
})

export default CameraOut;
