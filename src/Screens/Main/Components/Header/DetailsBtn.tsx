import React from "react";
import {TouchableOpacity,StyleSheet} from 'react-native';
import DefaultText from "../../../../Components/DefaultText";
import colors from "../../../../Constants/colors";


const DetailsBtn = ()=>{
    return <TouchableOpacity style={styles.touchable}>
        <DefaultText color='white'>Ver detalhes do saldo</DefaultText>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    touchable:{
        flex: 1,
        backgroundColor : colors.buttons,
        width:'100%',
        borderRadius:7,
        //borderWidth:0.5,
        borderColor:'gray',
        elevation:3,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:'5%',
        
    }
});

export default DetailsBtn;