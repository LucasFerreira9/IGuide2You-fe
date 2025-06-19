import React,{useState} from "react";
import ScreenView from "../../Components/ScreenView";
import DefaultText from "../../Components/DefaultText";
import Logo from "../../Components/Logo";
import { FileField, SwitchField, TextField } from "../../Components/Fields";
import { Dimensions, ScrollView, StyleSheet,View, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import useDimensions from "../../Hooks/useDimensions";
import CustomButton from "../../Components/DefaultButton";
import colors from "../../Constants/colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation";
import { signUp } from "../../Services/signUp";
import { TError } from "../../Types/TError";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";
import usePreventGoBack from "../../Hooks/usePreventGoBack";
import configs from "../../Constants/configs";
import { TextMedium, Text } from "../../Components/Text";
import { FileType } from "../../Components/Fields/FileField";
import { File } from "../../Types/File";
import UserPhotoView from "../../Components/UserPhotoView";
import Icon from "react-native-vector-icons/Feather";
import { getFCMToken } from "../../Services/Firebase";

const screen_width = Dimensions.get('screen').width;
const screen_height = Dimensions.get('screen').height;

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "SignUp">;
}

const SignUp:React.FC<Props> = ({navigation})=>{
    const [username,setUserName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [password_repeat,setPasswordRepeat] = useState<string>("");
    const [user_photo, set_user_photo] = useState<File | null>(null);
    const [isGuide,setIsGuide] = useState<boolean>(false);
    const dimensions = useDimensions();
    const [error, setError] = useState<TError | null>(null);
    const [showError, setShowError] = useState(false);
    const [showRequired, setShowRequired] = useState(false);

    usePreventGoBack();

    const onSubmit = async ()=>{

        if(username == "" || password=="" || password_repeat==""){
            setShowRequired(true);
            return;
        }
        if(password != password_repeat){
            setError(new TError("Senhas diferentes","digite a mesma senha"))
            setShowError(true);
            return;
        }

        const fcm_token = await getFCMToken()

        const result = await signUp({
            username: username,
            email: email,
            password: password,
            group: isGuide ? "GUIDE" : "NORMAL",
            photo_uri: user_photo?.url,
            fcm_token: fcm_token
        });
        
        if(result == null){
            if(isGuide)
                Alert.alert("Sucesso","Sua solicitação de criação de conta de guia foi registrada")
            else 
                ToastAndroid.show("Conta criada com sucesso",ToastAndroid.LONG);
            navigation.navigate('Login');
        }
        else{
            setError(result);
            setShowError(true);
        }    
    }

    return (
        <ScrollView style={{flex:1}} contentContainerStyle={{ flexGrow: 1}}>
        <ScreenView style={styles.container}>
            <Logo/>
            <View style={styles.TextLarge}>
                <DefaultText size={dimensions.getFontSize(28)}>Criar Conta</DefaultText>
            </View>
            <TextField 
                text={username} 
                setText={setUserName} 
                placeholder = {"Nome de usuário"} 
                style={styles.Fields}
                showRequired={showRequired}
                maxCharacters={configs.MAX_USERNAME_LENGTH}
            />
            <TextField
                text={email}
                setText={setEmail}
                placeholder={"Email"}
                style={styles.Fields}
                showRequired={showRequired}
            />
            <TextField 
                text={password} 
                setText={setPassword} 
                placeholder = {"Senha"} 
                style={styles.Fields}
                showRequired={showRequired}
                hideText={true}
                maxCharacters={configs.MAX_PASSWORD_LENGTH}/>
            <TextField 
                text={password_repeat} 
                setText={setPasswordRepeat} 
                placeholder = {"Repita sua senha"} 
                style={styles.Fields}
                showRequired={showRequired}
                hideText={true}
                maxCharacters={configs.MAX_PASSWORD_LENGTH}/>

            <View style={styles.photo_TextLarge}>
                <TextMedium>Foto de Perfil {'(opcional)'}</TextMedium>
                {
                    user_photo && (
                        <TouchableOpacity onPress={()=>set_user_photo(null)}>
                            <Icon name='trash' size={0.06 * screen_width}/>
                        </TouchableOpacity>
                    )
                }
            </View>
            
            {
                user_photo ? (    
                    <UserPhotoView local uri={user_photo.url} size={ 0.5 * screen_width}/>
                ) :
                <FileField 
                    file={user_photo} 
                    setFile={set_user_photo} 
                    file_type={FileType.PHOTO}
                    style={styles.photoField}
                    circle_view
                />
            }
            
            <SwitchField
                switchProps={{
                    isEnabled: isGuide, 
                    setEnabled: setIsGuide, 
                    width: 0.15 * screen_width
                }}
                text="Criar uma conta de Guia"
                style={styles.switchField}
            />

            <View style={styles.buttonView}>
                <CustomButton 
                    text="Cadastrar" 
                    textSize={dimensions.getFontSize(20)}
                    width={0.6 * screen_width}
                    height={0.15 * screen_width}
                    onPress={onSubmit}
                />
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                    <Text color={colors.main3} bold>Já possuo cadastro</Text>
                </TouchableOpacity>
            </View>

        </ScreenView>
     
        {
            showError && (
                <ErrorDialog 
                    message = {error}
                    onClickOk={()=>setShowError(false)}
                /> 
            )
        }
                
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 0.08 * screen_width
    },
    TextLarge:{
        paddingVertical: 0.06 * screen_height,
        justifyContent:'center'
    },
    Fields:{
        height: 0.1 * screen_height,
        marginBottom: 0.05 * screen_width,
        justifyContent:'space-between',
        
    },
    photoField:{
        height: 0.2 * screen_height,
        marginBottom: 0.05 * screen_width,
    },
    switchField:{
        height: 0.1 * screen_height,
        marginBottom: 0.08 * screen_width,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    buttonView:{
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height: 0.25 * screen_width,
        marginBottom: '10%'
    },
    photo_TextLarge:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center'
    }
})


export default SignUp;