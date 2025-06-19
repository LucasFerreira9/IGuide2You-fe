import React, { useEffect,useState } from "react";
import { View,FlatList, Image, StyleSheet } from "react-native";
import ScreenView from "../../Components/ScreenView";
import DefaultText from "../../Components/DefaultText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import useDimensions from "../../Hooks/useDimensions";
import ItemCard from "./components/ItemCard";
import colors from "../../Constants/colors";
import { BASE_URL } from "../../Services/API";
import { TextMedium } from "../../Components/Text";

type Props = NativeStackScreenProps<RootStackParamList,'ItemViewer'>

const ItemViewer:React.FC<Props> = ({navigation,route})=>{

    const {getFontSize,screen_width} = useDimensions();
    
    return (
        <ScreenView>
            <View style={{
                height:'30%',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:colors.default,
                elevation:5
            }}>
                <View style={{
                    width:'100%',
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    
                }}>
                    <Image 
                        resizeMode='contain'
                        source={{uri:`${BASE_URL}${route.params.image}`}}
                        style={{
                            width: '100%',
                            height:'100%',
                           
                        }}
                    />
                </View>
                <DefaultText color={'#FFFFFF'} size={getFontSize(28)}>{route.params.name}</DefaultText>
            </View>
            <View style={{width:'95%',height:'80%',alignSelf:'center'}}>
                <View style={{marginVertical:'9%'}}>
                    <TextMedium>Veja o que os guias tem a dizer sobre esse item:</TextMedium>
                </View>
            
                <FlatList 
                    data={route.params.videos} 
                    renderItem={
                        ({item})=><ItemCard 
                            {...item}
                            onPress = {()=>navigation.navigate('Player',{url:`${BASE_URL}${item.video_url}`})}
                        />
                    }
                    keyExtractor={item=>item.owner}
                />
            </View>
            
           
            
        </ScreenView>
    )
}



export default ItemViewer