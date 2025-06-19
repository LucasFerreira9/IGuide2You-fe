import React from "react";
import {StyleSheet,View,TouchableOpacity,Image} from 'react-native';
import Details from "./Details";
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsBtn from "./DetailsBtn";
import {vounchers,credits,points} from '../../../../Mocks/values';
import colors from "../../../../Constants/colors";

const Header = ()=>{

    return <View style={{...styles.container,backgroundColor:colors.background}}>
       <View style = {styles.view1}>
            {/*<TextLarge>IGuide2You</TextLarge>*/}
            <Image 
                source = {require('../../../../Assets/logo.png')}
                style = {styles.img}
                fadeDuration={500}/>
            
            <TouchableOpacity style = {styles.notificationBtn}>
                <Icon name = 'notifications-none' size={40} color={colors.icons}/>
            </TouchableOpacity>
            
       </View>
       <Details credits={credits} vouchers={vounchers} points ={points}/>
       <DetailsBtn/>
    </View>
};

const styles = StyleSheet.create({
    container:{
        flex:2,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:'5%'
    },
    view1:{
        flex:2,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    notificationBtn:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        width:'25%'
    },
    img:{
        width:'40%',
        height:40,
        alignSelf:'center',
        resizeMode:'center'
    }
    
});

export default Header;