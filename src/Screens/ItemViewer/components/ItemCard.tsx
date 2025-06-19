import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import useDimensions from '../../../Hooks/useDimensions';
import  Icon  from 'react-native-vector-icons/AntDesign';
import colors from '../../../Constants/colors';

import { Text } from '../../../Components/Text';
import { BASE_URL } from '../../../Services/API';
import Thumbnail from '../../../Components/Thumbnail';

type Props = {
    owner : string,
    video_url: string,
    created: string,
    likes: number,
    deslikes: number,
    onPress: ()=>void
}

const ItemCard:React.FC<Props> = ({
    owner,
    video_url,
    created, 
    likes,
    deslikes,
    onPress})=>{
 
    const {screen_height,screen_width} = useDimensions();
    

    return (
        <TouchableOpacity style={{
            ...styles.container,
            height: 0.15 * screen_height,
            marginVertical: 0.01 * screen_height,
            backgroundColor:colors.touchable
            }}
            onPress={onPress}>
            <View style={{...styles.image, width: 0.15 * screen_height}}>
                <Thumbnail uri={BASE_URL} route={video_url}/>
            </View>
            <View style={styles.description}>
                <View style={styles.details}>
                    <Text><Text bold>Por: </Text>{owner}</Text>
                    <Text><Text bold>Data: </Text>{created}</Text>
                    <View style={styles.likeview}>
                        <View style={styles.likeicon}>
                            <Icon name = 'heart' color={'#000000'} size={screen_width*0.04}/>
                        </View>
                        <View style={styles.likenumber}>
                            <Text>{likes}</Text>
                        </View>
                    </View>
                </View>    
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        borderRadius:10,
        width: '100%',
        alignSelf:'center',
        elevation:3,
    },
    image:{
        height:'100%',
        backgroundColor:'#000000',
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10
    },
    description:{
        flexDirection:'column',
        justifyContent:'flex-start',
        height:'100%',
        width: '60%',
        paddingHorizontal:'5%',
        paddingTop:'5%'
    },
    playIcon:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
   
    details:{
        flex:1
    },
    likeview:{
        marginTop:'5%',
        borderRadius: 10,
        height:'25%',
        width:'40%',
        alignItems:'center',
        flexDirection:'row',
        borderColor:'gray',
        borderWidth:1
    },
    likeicon:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:1,
        borderRightColor:'gray'
    },
    likenumber:{
        flex:2,
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:'5%'
    }
})

export default ItemCard;