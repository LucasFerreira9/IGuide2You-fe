import React, { useCallback } from "react";
import { Alert, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import colors from "../../Constants/colors";
import Icon from "react-native-vector-icons/Feather";
import { Text } from "../Text";
import DocumentPicker, { types } from 'react-native-document-picker';
import { showEditor } from 'react-native-video-trim';
import ImagePicker from 'react-native-image-crop-picker';
import useDimensions from "../../Hooks/useDimensions";
import { File } from "../../Types/File";

export enum FileType {
    PHOTO,
    VIDEO,
}

type FileFieldProps = {
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
    file_type: FileType,
    circle_view?: boolean,
    style?: StyleProp<ViewStyle>,
    maxSeconds?: number,
    minSeconds?: number,
    setCurrentVideo?: ()=>void
}

const FileField: React.FC<FileFieldProps> = ({ file, setFile, file_type, circle_view, style, minSeconds, maxSeconds, setCurrentVideo}) => {

    const { screen_width } = useDimensions();

    const onUpload = useCallback(async () => {
        let result
        try {
            switch (file_type) {
                case FileType.PHOTO: {
                    const size = 0.5 * screen_width;
                    result = await ImagePicker.openPicker({
                        width: size,
                        height: size,
                        cropping: true,
                        cropperToolbarTextLarge: "Editar Foto",
                        mediaType: "photo",
                        cropperCircleOverlay: circle_view,
                        cropperToolbarColor: colors.main2,
                        cropperChooseColor: colors.main2,
                        cropperCancelColor: colors.main2,
                        cropperTintColor: colors.main2,
                        cropperToolbarWidgetColor: "white",
                    });
                    
                    setFile({
                        name: result.filename ? result.filename : "arquivo sem nome",
                        size: result.size,
                        url: result.path
                    });
                    break;
                }
                case FileType.VIDEO: {
                    result = await DocumentPicker.pickSingle({
                        type: [types.video],
                        copyTo: 'documentDirectory'
                    });
                    if (result.fileCopyUri) {
                        showEditor(
                            result.fileCopyUri,
                            {
                                minDuration: minSeconds,
                                maxDuration: maxSeconds,
                                saveToPhoto: false,
                                removeAfterSavedToDocuments: true,
                                saveButtonText: "salvar",
                                cancelButtonText: "cancelar",
                                cancelDialogConfirmText: "confirmar",
                                cancelDialogCancelText: "fechar",
                                cancelDialogMessage: "tem certeza que quer cancelar?",
                                cancelDialogTitle: "aviso",
                                saveDialogCancelText: "fechar",
                                saveDialogConfirmText: "confirmar",
                                saveDialogMessage: "tem certeza que deseja salvar?",
                                saveDialogTitle: "confirmação",
                                cancelTrimmingDialogTitle: "aviso",
                                cancelTrimmingButtonText: "cancelar",
                                cancelTrimmingDialogCancelText: "fechar",
                                cancelTrimmingDialogConfirmText: "confirmar",
                                cancelTrimmingDialogMessage: "tem certeza que quer cancelar?",
                                trimmingText:"Cortando vídeo..."
                            }
                        )
                        if(setCurrentVideo) setCurrentVideo()

                        break;
                    }
                    else {
                        Alert.alert('Seu dispositivo tem espaço insuficiente','considere liberar mais espaço')
                    }
                }
            }
        }
        catch (err) {
            console.error('error loading file, '+err);
        }
    }, []);


    return <View style={style}>
        <TouchableOpacity
            style={styles.midiaFieldContainer}
            onPress={onUpload}>
            <>
                <Icon name={file_type == FileType.PHOTO ? 'image' : 'video'} size={40} color='gray' />
                <Text color='gray'>{file ? 'importar outro arquivo' : 'importar arquivo'}</Text>
            </>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    midiaFieldContainer: {
        width: '100%',
        height: '100%',
        borderColor: colors.main3,
        borderRadius: 15,
        borderWidth: 1.5,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default FileField;