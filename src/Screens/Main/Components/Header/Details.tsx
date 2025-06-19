import React from "react";
import {View,StyleSheet} from "react-native";
import DefaultText from "../../../../Components/DefaultText";

type props = {
    credits:number,
    points:number,
    vouchers:number
}

const Details:React.FC<props> = ({credits,points,vouchers})=>{

    return <View style={styles.constainer}>
        <View style={styles.cards}>
            <DefaultText>Créditos</DefaultText>
            <DefaultText>{`$ ${credits}`}</DefaultText>
        </View>
        <View style={{...styles.cards,marginHorizontal:'2%'}}>
            <DefaultText>Pontos</DefaultText>
            <DefaultText>{points}</DefaultText>
        </View>
        <View style={styles.cards}>
            <DefaultText>Voucher</DefaultText>
            <DefaultText>{vouchers}</DefaultText>
        </View>
    </View>
};

const styles = StyleSheet.create({
    constainer:{
        flex:2,
        flexDirection:'row',
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
    },
    cards:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        borderRadius:7,
        borderColor:'gray',
        borderWidth:0.8,
    }
});

export default Details;