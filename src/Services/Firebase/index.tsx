import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const getFCMToken = async ()=>{
    return await messaging().getToken();
}

const setBackgroundMessageHandler = ()=>{
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        const notifications = await EncryptedStorage.getItem('notifications')
        const json = notifications ? JSON.parse(notifications) : []
        json.push({
            TextLarge: remoteMessage.notification?.TextLarge,
            body: remoteMessage.notification?.body
        })
        await EncryptedStorage.setItem('notifications',JSON.stringify(json))
    });
}

const setForegroundMessageHandler = ()=>{
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        if(remoteMessage.notification?.TextLarge)
            Alert.alert(
                remoteMessage.notification?.TextLarge, 
                remoteMessage.notification?.body
            ) 
    });
    
    return unsubscribe;
}

const fetchBackgroundMessages = ()=>{
    EncryptedStorage.getItem('notifications').then((notifications:string | null)=>{
        if(notifications){
            const json = JSON.parse(notifications)
            Alert.alert(
                json[json.length-1].TextLarge,
                json[json.length-1].body
            )
        }
    })
}

export {getFCMToken,setBackgroundMessageHandler, setForegroundMessageHandler, fetchBackgroundMessages}