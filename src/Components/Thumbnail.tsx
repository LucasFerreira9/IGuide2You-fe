import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import {createThumbnail} from "react-native-create-thumbnail";
import useDimensions from "../Hooks/useDimensions";
import Icon from 'react-native-vector-icons/AntDesign';
import * as RNFS from 'react-native-fs';
import { formatPath } from "../Utils/FileSystem";

type Props = {
    uri: string,
    route?: string,
    context?: any
}

const Thumbnail:React.FC<Props> = ({uri, route,context})=>{

    const {screen_width} = useDimensions();
    const [thumbnail, setThumbnail] = useState<string>('');

    useEffect(()=>{
        let url = route ? uri + route : uri
        url = formatPath(url)
        createThumbnail({
            url
        })
        .then(response => setThumbnail(response.path))
        .catch(err => console.warn('thumbnail not loaded',err));
    
        return ()=>{
            try{
                if(thumbnail)
                    RNFS.unlink(thumbnail)       
            }
            catch(err){
                console.warn('cannot delete thumbnail',err)
            }
        }
       },[uri,route,context])

    return (
        thumbnail ?
        <>
            <Image 
                source={{uri: thumbnail}} 
                resizeMode='contain'
                style={{width:'100%',height:'100%'}}
            />
            <View style={styles.playIcon}>
                <Icon name='play' color={'#FFFFFF'} size={0.1 * screen_width} />
            </View>
        </> 
        :
        <View style={{width:'100%',height:'100%'}}>
        </View>
    )
}

const styles = StyleSheet.create({
    playIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
});

export default Thumbnail;