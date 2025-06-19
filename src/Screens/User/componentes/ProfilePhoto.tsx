import React from "react";
import { View,StyleSheet } from "react-native";
import useDimensions from "../../../Hooks/useDimensions";
import colors from "../../../Constants/colors";
import { TextLarge } from "../../../Components/Text";
import UserPhotoView from "../../../Components/UserPhotoView";
import { useUser } from "../../../Providers/UserProvider";
import { UserType } from "../../../Types/User";


const ProfilePhoto:React.FC = ()=>{
    
    const dimensions = useDimensions();
    
    let {user} = useUser()
    user = user as UserType

    return (
        <View style={{...styles.header, backgroundColor:colors.touchable}}>
            <View style={styles.profile_icon}>
                <UserPhotoView 
                    uri={ user.photo_uri ?? null}
                    size={0.3 * dimensions.screen_width}
                />
            </View>
            <TextLarge>{user.username}</TextLarge>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        justifyContent:'center',
        alignItems:'center',
        width:'92%',
        height:'35%',
        elevation:3,
        borderRadius:15
    },
    profile_icon:{
        borderRadius:100,
        backgroundColor:'#7E7E7E',
        marginBottom:'5%'
    },
});

export default ProfilePhoto