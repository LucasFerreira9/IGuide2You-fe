import { Image } from "react-native";
import useDimensions from "../Hooks/useDimensions";

const Logo = ()=>{
    const dimensions = useDimensions();

    return <Image 
        source = {require('../Assets/logoicon.png')}
        style={{
            width: dimensions.screen_width,
            height: dimensions.screen_height * 0.1,
            alignSelf:'center',
            justifyContent:'center',
            marginTop: dimensions.screen_height * 0.04
        }}
        resizeMode='contain'
    />
}



export default Logo;