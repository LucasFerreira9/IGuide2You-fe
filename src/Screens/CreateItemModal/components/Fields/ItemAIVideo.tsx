import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CreateItemContext } from "../..";
import { Text,TextLarge } from "../../../../Components/Text";
import FileField from "../../../../Components/Fields/FileField";
import useDimensions from "../../../../Hooks/useDimensions";
import { FileType } from "../../../../Components/Fields/FileField";
import FileName from "../../../../Components/FileName";

const ItemAIVideo = ()=>{

    const context = useContext(CreateItemContext);

    return (
        context && <View style={{flex:1}}>
            <View style={styles.header}>
                <View style={styles.text}>
                    <TextLarge>Video para reconhecimento</TextLarge>
                </View>
                <View style={styles.text}>  
                    <Text>Forneça um vídeo para treinamento do nosso modelo de inteligência artifical</Text>
                </View>
            </View>
            <View style={styles.midiaUpload}>
                {
                    context.trainvideo && (
                        <FileName file={context.trainvideo}/>
                    )
                }
                <FileField 
                    file={context.trainvideo} 
                    setFile={context.setTrainVideo}
                    file_type={FileType.VIDEO}
                    minSeconds={30}
                    maxSeconds={40}
                    setCurrentVideo={()=>{context.setCurrentVideo("TRAIN_VIDEO")}}
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
        alignItems:'center'
    }
})

export default ItemAIVideo;