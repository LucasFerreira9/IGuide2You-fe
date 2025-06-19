import { ActivityIndicator as AI, View } from "react-native";
import { TextMedium } from "./Text";
import useDimensions from "../Hooks/useDimensions";
import colors from "../Constants/colors";


const ActivityIndicator:React.FC<{text:string}> = ({text})=>{
    const {screen_width} = useDimensions();
    return (
        <View style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }}>
            <AI style={{marginVertical:'10%'}} size={0.1 * screen_width} color={colors.main1}/>
            <TextMedium>{text}</TextMedium>
        </View>
    )
}

export default ActivityIndicator;