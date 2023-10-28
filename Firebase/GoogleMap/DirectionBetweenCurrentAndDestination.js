import React, { useState, useRef } from 'react';
import { View, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const DirectionBetweenCurrentAndDestination = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const mapViewRef = useRef(null);

  const onCurrentLocationSelect = (data, details) => {
    setCurrentLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const onDestinationLocationSelect = (data, details) => {
    setDestinationLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const handleGetDirections = () => {
    if (mapViewRef.current && currentLocation && destinationLocation) {
      const coordinates = [currentLocation, destinationLocation];
      mapViewRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Enter Current Location"
        onPress={onCurrentLocationSelect}
        fetchDetails={true}
        query={{
          key: 'AIzaSyDlxo5QvMys94cMzhXfpD6aO8HNbvcFN4s',
          language: 'en',
        }}
      />
      <GooglePlacesAutocomplete
        placeholder="Enter Destination Location"
        onPress={onDestinationLocationSelect}
        fetchDetails={true}
        query={{
          key: 'AIzaSyDlxo5QvMys94cMzhXfpD6aO8HNbvcFN4s',
          language: 'en',
        }}
      />
      <Button title="Get Directions" onPress={handleGetDirections} />
      <MapView
        ref={mapViewRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 37.78825,
          longitude: currentLocation ? currentLocation.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && <Marker coordinate={currentLocation} title="Current Location" />}
        {destinationLocation && <Marker coordinate={destinationLocation} title="Destination Location" />}
        {currentLocation && destinationLocation && (
          <Polyline
            coordinates={[currentLocation, destinationLocation]}
            strokeWidth={2}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};

export default DirectionBetweenCurrentAndDestination;
