import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


const SimpleMapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  // const [currentLatitude, setCurrentLatitude] = useState(0)
  // const [currentLongitude, setCurrentLongitude] = useState(0)

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        findPosition()
      }
      else {
        console.log("Not Success");
      }
    }
  }

  useEffect(() => {
    requestPermissions()
  }, []);

  useEffect(() => {
    console.log("currentLocation===2", currentLocation);
  }, [currentLocation])

  const findPosition =() =>{
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("Position: ", position);
        const { latitude, longitude } = position.coords;
        // console.log("Latitude: " + latitude + " Longitude: " + longitude);
        // setCurrentLatitude(latitude)
        // setCurrentLongitude(longitude)
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log("error===",error)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  return (
    <View style={styles.container}>
      {console.log("currentLocation===", currentLocation)}
      {/* <Text>{`Hello${currentLatitude+"  "+currentLongitude}`}</Text> */}
      {/* <Text>Hello</Text> */}
      {currentLocation != null ?
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentLocation?.latitude || 0,
            longitude: currentLocation?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.longitude,
              }}
              title="My Location"
            />
          )}
        </MapView>
        :
        null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
  },
  map: {
    flex: 1,
    // backgroundColor: 'red',
  },
});

export default SimpleMapScreen;