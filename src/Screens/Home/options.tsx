import Icon from 'react-native-vector-icons/Feather';
import { Dimensions } from 'react-native';

const screen_height = Dimensions.get('screen').height;

type Params = {
    color: string,
    size: number
}

export const screen_options = {
    main: {
        tabBarShowLabel: false,
        tabBarIcon: 
            ({color,size}:Params) => 
            <Icon name = "map" color = {color} size = {screen_height * 0.04}/>
    },
    scanner: {
        tabBarShowLabel: false,
        tabBarIcon: 
        ({color,size}:Params) => 
        <Icon name = "camera" color = {color} size = {screen_height * 0.04}/>,
    },
    user: {
        tabBarShowLabel: false,
        tabBarIcon: 
        ({color,size}:Params) => 
        <Icon name = "user" color = {color} size = {screen_height * 0.04}/>,
    }
}

