import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CreateItemContext } from "../..";
import { Text,TextLarge } from "../../../../Components/Text";
import { FileField } from "../../../../Components/Fields";
import { FileType } from "../../../../Components/Fields/FileField";
import FileName from "../../../../Components/FileName";

const ItemPhoto = ()=>{

    const context = useContext(CreateItemContext);

    return (
        context && <View style={{flex:1}}>
            <View style={styles.header}>
                <View style={styles.text}>
                    <TextLarge>Foto do Item</TextLarge>
                </View>
                <View style={styles.text}>  
                    <Text>Forneça uma foto que represente esse item ou local</Text>
                </View>
            </View>
            <View style={styles.photoView}>
                {
                    context.image && (
                        <FileName file={context.image}/>
                    )
                }
                <FileField 
                    file={context.image} 
                    setFile={context.setImage}
                    file_type={FileType.PHOTO}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height:'30%'
    },
    photoView:{
        height:'50%'
    },
    text:{
        paddingBottom:'5%',   
    },
    midiaViewer:{
        flexDirection:'row',
        paddingBottom:'5%',
        alignItems:'center'
    }
})

export default ItemPhoto;