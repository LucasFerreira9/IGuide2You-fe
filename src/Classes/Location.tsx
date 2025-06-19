class Location {
    latitude: number;
    longitude: number;
    latitude_delta: number = 0.005;
    longitude_delta: number = 0.005;

    constructor(latitude:number,longitude:number){
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getRegion(){
        return {
            latitude: this.latitude,
            longitude: this.longitude,
            latitudeDelta: this.latitude_delta,
            longitudeDelta: this.longitude_delta
        }
    }
}

export default Location;