import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../Constants/colors";
import { TabParamList } from "../Home";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import ScreenView from "../../Components/ScreenView";
import Card from "./componentes/Card";
import ProfilePhoto from "./componentes/ProfilePhoto";
import { deleteUserContext } from "../../Utils/User";
import { TError } from "../../Types/TError";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";
import ConfirmationDialog from "../../Components/Dialogs/ConfirmationDialog";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../Navigation";
import DeleteAccountBtn from "./componentes/deleteAccountBtn";
import deleteUser from "../../Services/deleteUser";
import { useUser } from "../../Providers/UserProvider";
import { UserType } from "../../Types/User";

type Props = BottomTabScreenProps<TabParamList, "User">

const User: React.FC<Props> = (props) => {
    
    const navigation = useNavigation<StackTypes>();
    const [error, setError] = useState<TError | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showAccountDeleteAlert, setShowAccountDeleteAlert] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    let {user} = useUser()
    user = user as UserType

    const onClickItems = useCallback(() => {
        navigation.navigate('ItemManager');
    }, []);


    const logout = useCallback(async () => {
        await deleteUserContext();
        
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    }, []);

    const onDeleteAccount = useCallback(async () => {
        const response = await deleteUser();

        if(response instanceof TError){
            setError(response)
            setShowError(true)
            return
        }

        logout();
    }, []);


    return (
        <>
            <ScreenView style={styles.container}>
                <View style={{ ...styles.box, backgroundColor: colors.icons2 }} />
                <ProfilePhoto />
                <View style={styles.body}>
                    {user.group == 'GUIDE' && <Card text="Items" icon_name="eye" onPress={onClickItems} />}
                    <Card text="Logout" icon_name="logout" onPress={() => setShowAlert(true)} />
                    <View style={styles.danzerZone}>
                        <DeleteAccountBtn onPress={() => { setShowAccountDeleteAlert(true) }} />
                    </View>
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

            <ConfirmationDialog
                question="tem certeza que deseja sair?"
                onPressOk={() => {
                    setShowAlert(false);
                    logout();
                }}
                onPressCancel={() => setShowAlert(false)}
                visible={showAlert}
            />
            <ConfirmationDialog
                question="tem certeza que deseja deletar sua conta? 
                Essa ação é irreversível"
                onPressOk={() => {
                    setShowAccountDeleteAlert(false);
                    onDeleteAccount();
                }}
                onPressCancel={() => setShowAccountDeleteAlert(false)}
                visible={showAccountDeleteAlert}
            />

        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: '10%'
    },
    body: {
        height: '70%',
        width: '92%',
        alignItems: 'center',
        paddingTop: '10%'
    },
    box: {
        position: 'absolute',
        height: '25%',
        width: '100%',
    },
    danzerZone: {
        width: "100%",
        flexGrow: 1,
        justifyContent: "flex-end",
        paddingVertical: "10%"
    }
})

export default User;