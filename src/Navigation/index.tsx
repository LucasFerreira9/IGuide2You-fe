import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from "../Constants/colors";
import { UploadItemSet } from "../Types/Item";
import { DetectionResponse } from "../Services/predict";

import Player from "../Screens/Player/Index";
import Home from "../Screens/Home";
import ItemViewer from "../Screens/ItemViewer";
import ItemManager from "../Screens/ItemManager";
import CreateItemModal from "../Screens/CreateItemModal";
import SendingData from "../Screens/ItemUpload/ItemUploadScreen";
import VideoUploadScreen from "../Screens/VideoUploadScreen";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import { useUser } from "../Providers/UserProvider";

export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined; 
    Home: undefined;
    ItemViewer: DetectionResponse;
    Player: {url: string};
    ItemManager: undefined;
    CreateItem: undefined;
    ItemUploadScreenParam: UploadItemSet;
    VideoUploadScreen: {
        item_name: string,
        video_uri: string
    }
  }
  
export type StackTypes = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = ()=>{
    const {user} = useUser();
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
                <Stack.Screen
                    name = "Login"
                    component = {Login}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name = "SignUp"
                    component = {SignUp}
                    options={{headerShown:false}}
                />
                <Stack.Screen 
                    name = "Home" 
                    component = {Home}
                    options={{headerShown:false}}/>
                <Stack.Screen
                    name = "ItemViewer"
                    component={ItemViewer}
                    options={{headerShown:false}}
                />
                <Stack.Screen
                    name = "Player"
                    component = {Player}
                    options={{
                        headerTintColor:'white',
                        headerStyle: {
                            backgroundColor: colors.main1
                        },
                    }}
                />
                <Stack.Screen 
                    name="ItemManager"
                    component = {ItemManager}
                    options={{headerShown:false}}
                />
                <Stack.Group screenOptions={{ 
                    presentation: 'modal', animation:'slide_from_bottom'}}>
                    <Stack.Screen 
                        name="CreateItem"
                        component = {CreateItemModal}
                        options={{headerShown:false}}
                    />
                    <Stack.Screen 
                        name="ItemUploadScreenParam"
                        component = {SendingData}
                        options={{headerShown:false}}
                    />
                </Stack.Group>

                <Stack.Screen
                    name="VideoUploadScreen"
                    component = {VideoUploadScreen}
                    options={{headerShown:false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
