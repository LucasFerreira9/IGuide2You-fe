import { TouchableOpacity, StyleSheet, View,TouchableHighlight } from "react-native";
import colors from "../../../Constants/colors";
import { useState } from "react";
import { TextMedium, Text } from "../../../Components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Navigation";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "ItemManager", undefined>,
    selected: number,
    setSelected: React.Dispatch<React.SetStateAction<number>>
}

const Header:React.FC<Props> = ({navigation, selected, setSelected})=>{
    
    return (
        <View style={styles.container}>
            <View style={styles.TextLarge}>
                <TextMedium>ITEMS</TextMedium>
                <TouchableOpacity style={styles.createBtn} onPress={()=>{navigation.navigate('CreateItem')}}>
                    <TextMedium color="white">+ CRIAR</TextMedium>
                </TouchableOpacity>
            </View>
            
            <View style={styles.filter}>
                <TouchableHighlight 
                    style={{...styles.option, backgroundColor: selected==1 ? colors.main2 : undefined}}
                    onPress={()=>setSelected(1)}>  
                    <Text color = {selected==1?"white": undefined}>todos</Text> 
                </TouchableHighlight>
                <TouchableHighlight 
                    style={{...styles.option, backgroundColor: selected==2 ? colors.main2 : undefined}}
                    onPress={()=>setSelected(2)}>
                    <Text color = {selected==2?"white": undefined}>meus items</Text> 
                </TouchableHighlight>
                <TouchableHighlight 
                    style={{...styles.option, backgroundColor: selected==3 ? colors.main2 : undefined}}
                    onPress={()=>setSelected(3)}>
                    <Text color = {selected==3?"white": undefined}>upload</Text> 
                </TouchableHighlight>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        paddingHorizontal:'5%',
        paddingVertical:'5%'
    },
    TextLarge:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    filter:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    option:{
        borderRadius:15,
        borderColor:'#CDCDCD',
        borderWidth:1.5,
        width:'30%',
        height:'60%',
        justifyContent:'center',
        alignItems:'center'
        
    },
    createBtn:{
        backgroundColor:colors.main1,
        borderRadius:10,
        width:'40%',
        height:'80%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#CDCDCD',
        elevation:3,
        
    }
})

export default Header;