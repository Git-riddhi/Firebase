

// Fetch address and show location in map.


import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchPlaces = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const searchRef = useRef();
    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                ref={searchRef}
              
                onPress={(data, details = null) => { 
                    // 'details' is provided when fetchDetails = true
                    console.log('details=====', data, details);
                    console.log('latitude=====', details.geometry.location.lat);
                    console.log('longitude=====', details.geometry.location.lng);
                    setSelectedLocation({
                        latitude: parseFloat(details.geometry.location.lat),
                        longitude: parseFloat(details.geometry.location.lng),
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    })
                    setSelectedPlace(details.formatted_address)
                  
                }}
                currentLocation={true}
                currentLocationLabel='Current location'
                listViewDisplayed='auto'    
                fetchDetails={true}

                GoogleReverseGeocodingQuery={{
                    bounds: true,
                    language: 'en',
                }}
                query={{
                    key: "AIzaSyBNx-L2M4agAJ6gV9J8GktYUJHLJKUnWgc",
                    language: 'en',
                }}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    },
                    textInput: {
                        marginHorizontal: 10,
                        marginTop: 30,
                        height: 38,
                        color: 'black',
                        fontSize: 16,
                        backgroundColor: 'lightgrey'
                    },
                }}
            />

            {selectedLocation && (
                <MapView
                    style={styles.map}
                    region={{
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude,
                        latitudeDelta: selectedLocation.latitudeDelta,
                        longitudeDelta: selectedLocation.longitudeDelta,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                        title={selectedPlace}
                    />
                </MapView>

            )}

        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default SearchPlaces;
