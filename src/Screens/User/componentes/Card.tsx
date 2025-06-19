import React,{useState} from "react";
import { View,StyleSheet, Pressable } from "react-native";
import useDimensions from "../../../Hooks/useDimensions";
import colors from "../../../Constants/colors";
import Icon from "react-native-vector-icons/AntDesign";
import { TextMedium, Text } from "../../../Components/Text";

type Props = {
    text: string,
    icon_name: string,
    onPress?: ()=>void
}

const Card:React.FC<Props> = ({text,icon_name,onPress})=>{
    const [clicked, setClicked] = useState(false);
    const dimensions = useDimensions();

    const onClick = () => {
        setClicked(true); 
    };
    
    const onPressOut = () => {
        setClicked(false); 
    };

    return (
        <Pressable
            style={{...styles.container,backgroundColor: clicked ? colors.lvl3 : colors.background}}
            onPress={onPress}
            onPressIn={onClick}
            onPressOut={onPressOut}
            >
            <View style={{...styles.icon,backgroundColor:colors.icons2,height: 0.06 * dimensions.screen_height,width: 0.06 * dimensions.screen_height}}>
                <Icon name={icon_name} color={'white'} size={0.03 * dimensions.screen_height}/>
            </View>
            <Text>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        height:'15%',
        width:'100%',
        marginVertical:'2%',
        alignItems:'center',
        flexDirection:'row',
        
    },
    icon:{
        marginRight:'5%',
        padding:'3%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
    },
})

export default Card