import React from "react";
import { TouchableOpacity,View,Animated } from "react-native";
import colors from "../../Constants/colors";
import useDimensions from "../../Hooks/useDimensions";
import DefaultText from "../DefaultText";
import Icon from "react-native-vector-icons/Feather";
import Dialog from "./Components/Dialog";
import { Text } from "../Text";

type ConfirmationDialogProps = {
    question: string,
    onPressOk: ()=>void
    onPressCancel: ()=>void,
    visible: boolean
}

const ConfirmationDialog:React.FC<ConfirmationDialogProps> = (props)=>{
    const {screen_width,getFontSize} = useDimensions();
    
    return (
        <Dialog visible = {props.visible}>
            <View style={{flex:2.5,flexDirection:'row',alignItems:'center',justifyContent:'center',width:'90%'}}>
                <Icon name="alert-circle" size={0.08 * screen_width} color='yellow' style={{marginRight:'5%'}}/>
                <Text>{props.question}</Text>
            </View>
            <View style={{
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                borderTopWidth:0.5,
                borderTopColor:'gray'
            }}>

            <TouchableOpacity 
                style={{
                    //backgroundColor: theme.buttons,
                    flex:1,
                    height:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                    borderColor:'gray',
                    borderRightWidth: 0.5,
                    borderBottomLeftRadius:10
                }}
                onPress={props.onPressCancel}>
                <DefaultText size = {getFontSize(15)} >Cancelar</DefaultText>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    //backgroundColor: theme.buttons,
                    flex:1,
                    height:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                    borderBottomRightRadius:10
                }}
                onPress={props.onPressOk}>
                <DefaultText size = {getFontSize(15)} >OK</DefaultText>
            </TouchableOpacity>
            </View>
        </Dialog>
    )
}


export default ConfirmationDialog;