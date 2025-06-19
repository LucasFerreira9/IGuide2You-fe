import React from "react";
import { Image,  StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { BASE_URL } from "../Services/API";

type Props = {
    uri: string | null,
    size: number,
    local?: boolean   
}

const UserPhotoView:React.FC<Props> = ({uri, size,local})=>{

    return (
        <View style={{...styles.container, width: size, height: size}}>
            {
                uri ? (
                    <Image 
                        source={{uri: local ? uri : `${BASE_URL}${uri}`}}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ) :
                <Icon 
                    name='user' 
                    color={'white'} 
                    size={size}
                />
            }  
        </View>
        
    )
};

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignSelf:'center'
    },
    image:{
        width:'100%', 
        height:'100%',
        borderRadius: 1000
    }
})

export default UserPhotoView