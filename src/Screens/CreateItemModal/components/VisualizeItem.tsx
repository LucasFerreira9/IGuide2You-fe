import React,{useContext} from "react";
import { View, StyleSheet,Image } from "react-native";
import { CreateItemContext } from "..";
import { Text,TextLarge } from "../../../Components/Text";
import Thumbnail from "../../../Components/Thumbnail";
import colors  from "../../../Constants/colors";

const VisualizeItem = ()=>{
    const context = useContext(CreateItemContext);

    return (
        <View style={styles.container}>
            <View style={{...styles.header,backgroundColor:colors.touchable}}>
                <View style={styles.name}>
                    <TextLarge bold>{context?.itemName}</TextLarge>
                </View>
                <View style = {styles.image}>
                        {context?.image && <Image 
                            source={{uri: context.image.url}} 
                            style={{width:'100%',height:'100%'}}
                            resizeMode='contain'
                        />}
                </View>
                
            </View>
            
            <View style={{...styles.card,backgroundColor:colors.touchable}}>
                <View style={styles.videoCard}>
                    <View style={styles.video_desc}>
                        <Text>Vídeo do item</Text>
                    </View>
                    <View style={styles.video}>
                        {context?.video && <Thumbnail uri={context.video.url} context={context}/>}
                    </View>
                </View>

                <View style={styles.videoCard}>
                    <View style={styles.video_desc}>
                        <Text>Vídeo para treinamento de detecção</Text>
                    </View>
                    <View style={styles.video}>
                        {context?.trainvideo && <Thumbnail uri={context.trainvideo.url} context={context}/>}
                    </View>
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom:'5%'
    },
    header:{
        height:'38%',
        width:'100%',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:'3%'
        
    },
    card:{
        width:'100%',
        height:'60%',
        flexDirection:'column',
        elevation:3,
        borderRadius:10,
        paddingBottom:'5%',
        paddingLeft:'5%'
    },
    videoCard:{
        width:'100%',
        flex:1,
        flexDirection:'column',
    },
    image:{
        flex:4,
        width:'100%',
        height:'100%',
        borderRadius:10,
    },
    video:{
        flex:2,
        width:'50%',
        backgroundColor:'#000000',
        borderRadius:10,
    },
    video_desc:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    name:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default VisualizeItem;