import { Animated, TouchableHighlight } from "react-native";
import React,{useRef} from "react";
import colors from "../Constants/colors";

type Props = {
    isEnabled: boolean,
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>
    width: number 
    
}

const CustomSwitch:React.FC<Props> = ({isEnabled, setEnabled,width})=>{

    const animation = useRef(new Animated.Value(0)).current;

    const activate = ()=>{
        Animated.timing(animation,{
            toValue: width / 2,
            duration: 300,
            useNativeDriver:true
        }).start();
    }

    const deactivate = ()=>{
        Animated.timing(animation,{
            toValue: 0,
            duration: 300,
            useNativeDriver:true
        }).start();
    }

    const onPress = ()=>{
        if(isEnabled) deactivate();
        else activate();

        setEnabled(!isEnabled);
    }

    return (
        <TouchableHighlight
            onPress={onPress}
            style={{
                justifyContent:'flex-start',
                alignItems:'center',
                flexDirection:'row',
                padding: width/20,
                backgroundColor: isEnabled? colors.main3 : 'gray',
                width: width,
                height: width / 2,
                borderRadius: width 
            }}>
            <Animated.View
                style={{
                    backgroundColor:'white',
                    width: width / 2.5,
                    height: width / 2.5,
                    borderRadius: width,
                    transform:[{translateX: animation}]
                }}>

            </Animated.View>

        </TouchableHighlight>
    )
}   


export default CustomSwitch