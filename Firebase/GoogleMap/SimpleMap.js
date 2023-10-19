import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const SimpleMap = () => {
  return (

    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        // showsUserLocation={false}
        // followUserLocation={false}
        //   zoomEnabled={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          onDragEnd={
            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
          }
          title={'Test Marker'}
          description={'This is a description of the marker'}
        />
      </MapView>
    </View>

  );
};

export default SimpleMap;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // height: '100%',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    // position:'absolute',
    // top:0,
    // right:0,
    // left:0,
    // bottom:0

  },
});