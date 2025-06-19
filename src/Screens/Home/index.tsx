import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../Main/Index";
import Scanner from "../Scanner/Index";
import User from "../User";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import { screen_options} from "./options";
import usePreventGoBack from "../../Hooks/usePreventGoBack";
import colors from "../../Constants/colors";
import useDimensions from "../../Hooks/useDimensions";
import { useEffect } from "react";
import { setForegroundMessageHandler, fetchBackgroundMessages } from "../../Services/Firebase";

export type TabParamList = {
    Main: undefined;
    Scanner: undefined;
    User: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const Home = ({route}: NativeStackScreenProps<RootStackParamList,'Home'>)=>{

    usePreventGoBack();
    useEffect(setForegroundMessageHandler,[]);
    useEffect(fetchBackgroundMessages,[]);


    const {screen_height} = useDimensions()

    const options = {
        headerShown : false,
        tabBarActiveTintColor: colors.default,
        tabBarInactiveTintColor: '#7F7F7F',
        tabBarStyle: {
            height: screen_height * 0.08, 
            backgroundColor: colors.background,
        }
    }

    return (
        <Tab.Navigator 
            initialRouteName="Main"
            backBehavior="initialRoute"
            detachInactiveScreens={true}
            screenOptions={options}>
            <Tab.Screen 
                name = "Main" 
                component = {Main}
                options = {screen_options['main']}/>
            <Tab.Screen 
                name = "Scanner" 
                component = {Scanner}
                options = {screen_options['scanner']}/>
            <Tab.Screen
                name = "User"
                component = {User}
                options = {screen_options['user']}
            />
        </Tab.Navigator>
    )
}

export default Home