import {PermissionsAndroid} from 'react-native';

export async function getLocationPermission():Promise<boolean>{
    return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) 
        == PermissionsAndroid.RESULTS.GRANTED;
};

export async function getCameraPermission():Promise<boolean>{
    return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA) 
        == PermissionsAndroid.RESULTS.GRANTED;
};

export async function getPostNotificationPermission():Promise<boolean>{
    return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS) 
        == PermissionsAndroid.RESULTS.GRANTED;
}

