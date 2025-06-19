import { Dimensions, PixelRatio } from 'react-native';
import { useState} from 'react';


const fontScale = PixelRatio.getFontScale();
function getFontSize(size:number):number{return size / fontScale;}
  
const useDimensions = ()=>{
    const [screen_width,setWidth] = useState(Dimensions.get('screen').width);
    const [screen_height,setHeight] = useState(Dimensions.get('screen').height);

    return {screen_height,screen_width,getFontSize}
}

export default useDimensions;