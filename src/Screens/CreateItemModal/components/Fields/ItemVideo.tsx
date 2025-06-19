import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CreateItemContext } from "../..";
import { Text,TextLarge } from "../../../../Components/Text";
import FileField from "../../../../Components/Fields/FileField";
import { FileType } from "../../../../Components/Fields/FileField";
import FileName from "../../../../Components/FileName";

const ItemVideo = ()=>{

    const context = useContext(CreateItemContext);

    return (
        context && <View style={{flex:1}}>
            <View style={styles.header}>
                <View style={styles.text}>
                    <TextLarge>Video do item</TextLarge>
                </View>
                <View style={styles.text}>  
                    <Text>Forneça um vídeo que descreva este item ou local para que as pessoas possam conhecer.</Text>
                </View>
            </View>
            <View style={styles.midiaUpload}>
                {
                    context.video && (
                        <FileName file={context.video}/>
                    )
                }
                <FileField 
                    file={context.video} 
                    setFile={context.setVideo}
                    file_type={FileType.VIDEO}
                    setCurrentVideo={()=>{context.setCurrentVideo("VIDEO")}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height:'30%'
    },
    midiaUpload:{
        height:'50%'
    },
    text:{
        paddingBottom:'5%',
    },
    midiaViewer:{
        flexDirection:'row',
        paddingBottom:'5%',
        alignItems:'center',
    }
})

export default ItemVideo;