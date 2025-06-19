import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { TextField } from "../../../../Components/Fields";
import { CreateItemContext } from "../..";
import { Text, TextLarge } from "../../../../Components/Text";

const ItemName = ()=>{

    const context = useContext(CreateItemContext);


    return (
        context && <View style={{flex:1}}>
            <View style={styles.text}>
                <TextLarge>Nome do Item</TextLarge>
            </View>
            <View style={styles.text}>  
                <Text>Forneça um nome único para esse item ou local</Text>
            </View>
            <TextField
                text={context.itemName}
                setText={context.setItemName}
                showRequired={false}
                placeholder="Nome do item"
                errorText={context.repeatedName ? "Item já criado" : ""}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        paddingBottom:'5%'
    }
})

export default ItemName;