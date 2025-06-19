import React, { useState } from "react";
import ScreenView from "../../Components/ScreenView";
import DefaultText from "../../Components/DefaultText";
import Logo from "../../Components/Logo";
import { TextField } from "../../Components/Fields";
import { Dimensions, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import useDimensions from "../../Hooks/useDimensions";
import CustomButton from "../../Components/DefaultButton";
import colors from "../../Constants/colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation";
import { login } from "../../Services/login";
import { TError } from "../../Types/TError";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";
import { saveUserContext } from "../../Utils/User";
import usePreventGoBack from "../../Hooks/usePreventGoBack";
import configs from "../../Constants/configs";
import { useUser } from "../../Providers/UserProvider";

const screen_width = Dimensions.get('screen').width;
const screen_height = Dimensions.get('screen').height;

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Login">;
}

const Login: React.FC<Props> = ({ navigation }) => {
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dimensions = useDimensions();
    const [error, setError] = useState<TError | null>(null);
    const [showError, setShowError] = useState(false);
    const [showRequired, setShowRequired] = useState(false);

    const {setUser} = useUser()

    usePreventGoBack();

    const onSubmit = async () => {

        if (username == "" || password == "") {
            setShowRequired(true);
            return;
        }

        
        const response = await login({
            username: username,
            password: password
        })
        
        if(response instanceof TError){
            setError(response)
            setShowError(true)
        }
        else{
            console.log('login',response)
            await saveUserContext(response)
            setUser(response);
            navigation.navigate('Home')
        }

    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <ScreenView style={styles.container}>
                <Logo />
                <View style={styles.TextLarge}>
                    <DefaultText size={dimensions.getFontSize(30)}>Login</DefaultText>
                </View>
                <TextField
                    text={username}
                    setText={setUserName}
                    placeholder={"Nome de usuário"}
                    style={styles.Fields}
                    showRequired={showRequired}
                    maxCharacters={configs.MAX_USERNAME_LENGTH}
                />
                <TextField
                    text={password}
                    setText={setPassword}
                    placeholder={"Senha"}
                    style={styles.Fields}
                    showRequired={showRequired}
                    hideText={true}
                    maxCharacters={configs.MAX_PASSWORD_LENGTH} />

                <View style={styles.buttonView}>
                    <CustomButton
                        text="Entrar"
                        textSize={dimensions.getFontSize(20)}
                        width={0.6 * screen_width}
                        height={0.15 * screen_width}
                        onPress={onSubmit}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <DefaultText color={colors.main3} size={dimensions.getFontSize(18)}>Não possuo uma conta</DefaultText>
                    </TouchableOpacity>
                </View>
            </ScreenView>

            {
                showError && (
                    <ErrorDialog
                        message={error}
                        onClickOk={() => setShowError(false)}
                    />
                )
            }

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0.08 * screen_width
    },
    TextLarge: {
        paddingVertical: 0.06 * screen_height,
        justifyContent: 'center'
    },
    Fields: {
        height: 0.1 * screen_height,
        marginBottom: 0.05 * screen_width,
        justifyContent: 'space-between',

    },
    switchField: {
        height: 0.1 * screen_height,
        marginBottom: 0.08 * screen_width,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 0.25 * screen_width,
        marginBottom: '10%'
    }
})


export default Login;