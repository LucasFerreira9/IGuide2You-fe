import { PropsWithChildren} from "react"
import { View,Modal } from "react-native"
import colors from "../../../Constants/colors";
import useDimensions from "../../../Hooks/useDimensions";
import { GestureHandlerRootView, gestureHandlerRootHOC } from "react-native-gesture-handler";

const Dialog = (props:PropsWithChildren<{visible:boolean}>)=>{

    const {screen_height} = useDimensions();

    return (
        <View>
            <Modal
                transparent={true}
                animationType="slide"
                visible={props.visible}
                >
                <GestureHandlerRootView style={{
                    flex:1,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    alignItems:'center',
                    justifyContent: 'center'
                    
                }}>
                    <View style={{
                         height: 0.25 * screen_height,
                         width: '90%',
                         paddingHorizontal:'5%',
                         backgroundColor: colors.background,
                         alignItems: 'center',
                         justifyContent: 'center',
                         borderRadius:10,
                         flexDirection:'column',
                         elevation:5,
                    }}>
                        {props.children}    
                    </View>  
                </GestureHandlerRootView>
            </Modal>
        </View>    
    )
}

export default Dialog;