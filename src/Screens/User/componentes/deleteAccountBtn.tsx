import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../../../Components/Text";


type Props = {
    onPress: ((event: GestureResponderEvent) => void) | undefined
}

const DeleteAccountBtn:React.FC<Props> = ({onPress})=>{
    return <TouchableOpacity 
        style={styles.container}
        onPress={onPress}>
        <Text color={"white"} bold>Deletar conta</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:`rgba(255,0,0,0.8)`,
        width:"40%",
        paddingHorizontal:"5%",
        paddingVertical:"4%",
        borderRadius: 10,
        justifyContent:"center",
        alignItems:"center"
    }
});

export default DeleteAccountBtn;