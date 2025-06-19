import { StyleSheet, TouchableOpacity, Image,View} from "react-native";
import useDimensions from "../../../Hooks/useDimensions";
import colors from "../../../Constants/colors";
import { URI } from "../../../Services/services";
import { Text } from "../../../Components/Text";
import Icon from "react-native-vector-icons/Feather";
import { UploadItem } from "../../../Types/Item";

type Props = {
    uploadItem: UploadItem,
    onClickRemove: ()=>void
}

const MyItemCard:React.FC<Props> = ({uploadItem, onClickRemove})=>{
    
    const {screen_height} = useDimensions();

    return (
        <View 
            style={{
                ...styles.container,
                height: 0.15 * screen_height,
                marginVertical: 0.01 * screen_height,
                backgroundColor:colors.touchable
            }}>
            <View style={{height:'100%',width:'30%',backgroundColor:'#000000'}}>
                <Image 
                    resizeMode='contain'
                    source={{uri:uploadItem.photoUri}}
                    style={{height: '100%'}}/>
            </View>
            <View style={styles.description}>
                <Text>{uploadItem.name}</Text>
            </View>
            
            <TouchableOpacity 
                style = {styles.uploadBtn}
                onPress={onClickRemove}>
                <Icon name="trash" color={colors.icons} size={26}/>
            </TouchableOpacity>  
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        borderRadius:10,
        paddingHorizontal:'5%',
        width: '99%',
        alignSelf:'center',
        elevation:5
    },
    description:{
        flexDirection:'column',
        justifyContent:'flex-start',
        height:'100%',
        width: '50%',
        padding:'5%'
    },
    uploadBtn:{
        justifyContent:'center',
        alignItems:'center',
        width: '20%',
        height:'100%'
    }
})

export default MyItemCard;