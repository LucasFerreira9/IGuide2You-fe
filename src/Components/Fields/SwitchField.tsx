import { StyleProp, View, ViewStyle } from "react-native";
import CustomSwitch from "../CustomSwitch";
import { TextMedium} from "../Text";

type SwitchFieldProps = {
    switchProps: {
        isEnabled: boolean,
        setEnabled: React.Dispatch<React.SetStateAction<boolean>>
        width: number 
    },
    text: string,
    style?: StyleProp<ViewStyle>
}

const SwitchField:React.FC<SwitchFieldProps> = ({switchProps,text,style})=>{

    return (
        <View style={style}>
            <TextMedium>{text}</TextMedium>
            <CustomSwitch {...switchProps}/>
        </View>
    )
}

export default SwitchField;