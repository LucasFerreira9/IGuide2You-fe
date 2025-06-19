import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {StyleSheet,View} from 'react-native';
import Location from '../../../Classes/Location';
import { useEffect,useState } from 'react';
import { getLocationPermission } from '../../../Utils/Permissions';
import Geolocation from '@react-native-community/geolocation';
import ActivityIndicator from '../../../Components/ActivityIndicator';

const DEFAULT_LOCATION: Location = new Location(-20.385854, -43.503633)

const Map = ()=>{

   const [locationgranted,setLocationgranted] = useState<boolean>(false);
   const [initialLocation,setInitialLocation] = useState<Location | null>(null);
   const [loading,setLoading] = useState<Boolean>(true);

   useEffect(()=>{
    const getPermission = async ()=>{
        const response =  await getLocationPermission();
        setLocationgranted(response);
        if(response){
            Geolocation.getCurrentPosition((position)=>{
                console.log(position);
                setInitialLocation(new Location(position.coords.latitude,position.coords.longitude));
                setLoading(false);
            },
            (error)=>{
                console.warn(error.message);
            },
            {
                enableHighAccuracy:true,
                timeout:10000
            });
        }
        else
            setLoading(false);
    }

    getPermission();
   },[]);

   if(loading)
    return <View style = {styles.loading}>
                <ActivityIndicator text="carregando mapa..."/>
            </View>

   return <View style={styles.container}>
         <MapView
            provider={PROVIDER_GOOGLE} 
            showsUserLocation={locationgranted}
            followsUserLocation={locationgranted}
            showsCompass={locationgranted}
            style={styles.map}
            loadingEnabled={false}
            initialRegion={ initialLocation ? {...initialLocation.getRegion()} : {
                latitude: DEFAULT_LOCATION.latitude,
                longitude: DEFAULT_LOCATION.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}>
     </MapView>
   </View>
};

const styles = StyleSheet.create({
    container:{
        flex:3
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    loading:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default Map;

