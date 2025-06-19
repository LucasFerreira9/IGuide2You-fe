import React from "react";
import { View,StyleSheet, TouchableOpacity} from "react-native";
import DefaultText from "../DefaultText";
import Icon from "react-native-vector-icons/AntDesign";
import { TError } from "../../Types/TError";
import Dialog from "./Components/Dialog";
import { Button } from "react-native";
import useDimensions from "../../Hooks/useDimensions";
import { Text } from "../Text";

type Props = {
    message: TError | null
    onClickOk: ()=>void
}

const ErrorDialog:React.FC<Props> = ({message,onClickOk})=>{

    const {getFontSize,screen_height} = useDimensions();

    return <Dialog visible={true}>
        <View style={styles.TextLarge}>
            <Icon 
                name = {"closecircleo"} 
                size = {0.04 * screen_height} color={"red"} 
                style={{marginRight:'5%'}}/>
            <Text 
                color='red'>
                    {message?.TextLarge}
            </Text>
        </View>
        <View style={styles.textView}>
            <DefaultText textAlign="justify" fontWeight="600">{message?.text}</DefaultText>
        </View>
        <TouchableOpacity style={styles.okView} onPress={onClickOk}>
            <DefaultText size={getFontSize(18)}>OK</DefaultText>
        </TouchableOpacity>
    </Dialog>
};

const styles = StyleSheet.create({
    TextLarge:{
        flex:1,
        //width:'95%',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        marginTop:'5%'
    },
    textView:{
        flex:1.5,
        justifyContent:'center',
    },
    okView:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderTopColor:'gray',
        borderTopWidth:1
    }

})

export default ErrorDialog;