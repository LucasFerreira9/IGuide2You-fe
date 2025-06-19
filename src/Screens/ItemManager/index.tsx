import React, { useState, useEffect, useCallback, useContext, } from "react";
import { Dimensions, FlatList, NativeEventEmitter, NativeModules, StyleSheet, ToastAndroid, View } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import DocumentPicker, { types } from 'react-native-document-picker';
import { showEditor } from 'react-native-video-trim';

import ScreenView from "../../Components/ScreenView";
import { getItems } from "../../Services/getItems";
import { TError } from "../../Types/TError";
import ActivityIndicator from "../../Components/ActivityIndicator";
import ItemCard from "./components/Card";
import Header from "./components/Header";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";
import { UploadItemSet } from "../../Types/Item";
import { Item } from "../../Types/Item";
import { ItemsSet } from "../../Types/Item";
import MyItemCard from "./components/MyItemCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../Constants/colors";
import ConfirmationDialog from "../../Components/Dialogs/ConfirmationDialog";
import getRepeatedItems from "../../Services/getRepeatedItems";
import { useUser } from "../../Providers/UserProvider";

type Props = NativeStackScreenProps<RootStackParamList, "ItemManager">;

const ItemManager: React.FC<Props> = ({ navigation, route }) => {
    const [toDelete, setToDelete] = useState<number | null>(null);
    const [dialog, showDialog] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<ItemsSet>([]);
    const [notAdded, setNotAdded] = useState<ItemsSet>([]);
    const [myItems, setmyItems] = useState<ItemsSet>([]);
    const [uploadItems, setUploadItems] = useState<UploadItemSet>([]);
    const [videoItemName, setVideoItemName] = useState<string | null>(null);

    const [error, setError] = useState<TError | null>(null);
    const [showError, setShowError] = useState(false);

    const {user} = useUser()

    const loadItems = useCallback(async () => {

        const result = await getItems();

        if (result instanceof TError) {
            setError(result)
            setShowError(true)
            return;
        }

        const response = result as ItemsSet
        setItems(response);

        const username = user?.username

        const not_added = response.filter((item) => {
            let hasVideo = false
            for (const video of item.videos)
                if (video.guide == username) {
                    hasVideo = true;
                    break;
                }
            return !hasVideo
        });
        setNotAdded(not_added)

        const my_items = response.filter(item => item.owner == username);
        setmyItems(my_items);
        console.log(my_items)

        let upload_items_saved = await EncryptedStorage.getItem("upload_items");
        const upload_items = upload_items_saved ? JSON.parse(upload_items_saved) : [];
        setUploadItems(upload_items);

        setLoading(false);

    }, []);

    const onClickUpload = useCallback(async () => {
        if (uploadItems.length == 0) {
            ToastAndroid.show("Não há items a serem enviados", ToastAndroid.CENTER);
            return;
        }
        try {
            const response = await getRepeatedItems(uploadItems);
            console.log(response)
            if(response instanceof TError){
                setError(response)
                setShowError(true)
                return
            }

            const repeated = response["repeated"];
            if (repeated.length == 0) {
                navigation.navigate("ItemUploadScreenParam", uploadItems);
            }
            else{
                setError(new TError(
                    `Os seguintes items já estão registrados: `,
                    `${repeated.map((item: string) => `${item},`)}`
                ));
                setShowError(true)
            }
                
        }
        catch (err) {
            if (err instanceof TError)
                setError(err);
        }
        //migrate to upload page
    }, [uploadItems]);

    const onClickAdd = useCallback(async (item: Item) => {
        setVideoItemName(item.name)
        const video = await DocumentPicker.pickSingle({ type: types.video, copyTo: 'documentDirectory' });
        if (video.fileCopyUri)
            showEditor(video.fileCopyUri, { maxDuration: 30, saveToPhoto: false });
        else {
            console.warn(video.copyError)
        }
    }, []);

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
        const subscription = eventEmitter.addListener('VideoTrim', (event) => {
            switch (event.name) {
                case 'onLoad': {
                    // on media loaded successfully
                    console.log('onLoadListener', event);
                    break;
                }
                case 'onShow': {
                    console.log('onShowListener', event);
                    break;
                }
                case 'onHide': {
                    console.log('onHide', event);
                    break;
                }
                case 'onStartTrimming': {
                    console.log('onStartTrimming', event);
                    break;
                }
                case 'onFinishTrimming': {
                    console.log('onFinishTrimming', event);

                    if (videoItemName) {
                        navigation.navigate('VideoUploadScreen', {
                            item_name: videoItemName,
                            video_uri: event.outputPath
                        })
                    }

                    break;
                }
                case 'onCancelTrimming': {
                    console.log('onCancelTrimming', event);
                    break;
                }
                case 'onCancel': {
                    console.log('onCancel', event);
                    break;
                }
                case 'onError': {
                    console.log('onError', event);
                    break;
                }
                case 'onLog': {
                    console.log('onLog', event);
                    break;
                }
                case 'onStatistics': {
                    console.log('onStatistics', event);
                    break;
                }
            }
        });

        return () => {
            subscription.remove();
        };
    }, [videoItemName]);

    const onClickRemove = useCallback(async () => {
        if (toDelete != null) {
            const new_items = uploadItems;
            new_items.splice(toDelete, 1);
            await EncryptedStorage.setItem("upload_items", JSON.stringify(new_items));
            loadItems();
        }
    }, [uploadItems, toDelete]);

    useEffect(() => {
        const sub = navigation.addListener("focus", () => {
            setLoading(true);
            loadItems();
        });
        return sub
    }, [navigation, uploadItems]);

    return (
        loading ? (
            <ScreenView>
                <ActivityIndicator text={'carregando items'} />
                
            </ScreenView>
        ) : (
            <ScreenView style={styles.container}>
                <Header navigation={navigation} selected={selected} setSelected={setSelected} />
                <View style={styles.body}>
                    {
                        selected == 1 ?
                            <FlatList
                                data={items}
                                renderItem={item =>
                                    <ItemCard
                                        name={item.item.name}
                                        image={item.item.image}
                                        onClickAdd={notAdded.includes(item.item) ? () => onClickAdd(item.item) : undefined}
                                    />
                                }
                                keyExtractor={item => item.name} />
                            : selected == 2 ?
                                <FlatList
                                    data={myItems}
                                    renderItem={item =>
                                        <ItemCard
                                            name={item.item.name}
                                            image={item.item.image}
                                        />}
                                    keyExtractor={item => item.name} />
                                :
                                <>
                                    <FlatList
                                        data={uploadItems}
                                        renderItem={({ item, index }) =>
                                            <MyItemCard
                                                uploadItem={item}
                                                onClickRemove={() => setToDelete(() => index)} />}
                                        keyExtractor={item => item.name} />
                                    <TouchableOpacity
                                        style={styles.uploadBtn}
                                        onPress={() => showDialog(true)}>
                                        <Icon name="upload" size={25} color={"white"} />
                                    </TouchableOpacity>
                                </>
                    }
                </View>
                <ConfirmationDialog
                    question={"Confirmar upload de items?"}
                    onPressOk={() => {
                        onClickUpload();
                        showDialog(false);
                    }}
                    onPressCancel={() => showDialog(false)}
                    visible={dialog}
                />
                <ConfirmationDialog
                    question={"Tem certeza que deseja deletar o item?"}
                    onPressOk={() => {

                        onClickRemove().then(() => {
                            setToDelete(null);
                        })
                    }}
                    onPressCancel={() => setToDelete(null)}
                    visible={toDelete != null}
                />
                {
                    showError && error && (
                        <ErrorDialog
                            message={error}
                            onClickOk={() => {
                                setShowError(true)
                                setError(null);
                            }}
                        />
                    )
                }
                
            </ScreenView>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    body: {
        flex: 6,
        pmy_itemsingHorizontal: '5%'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadBtn: {
        position: 'absolute',
        right: 0.02 * Dimensions.get("screen").width,
        bottom: 0.05 * Dimensions.get("screen").width,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        width: 0.15 * Dimensions.get("screen").width,
        height: 0.15 * Dimensions.get("screen").width,
        backgroundColor: colors.icons
    }
})

export default ItemManager;