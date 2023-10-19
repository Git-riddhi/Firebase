import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchPlaces = () => {


    const ref = useRef();

    useEffect(() => {
        ref.current?.setAddressText('Some Text');
    }, []);

    return (
        <View style={styles.container}>
            {/* <View style={styles.innercontainer}> */}

            <GooglePlacesAutocomplete
                ref={ref}
                placeholder='search'
                onPress={(data, details = null) => {
                    console.log('data and details ===>', data, details);
                }}
                query={{
                    key: 'AIzaSyBNx-L2M4agAJ6gV9J8GktYUJHLJKUnWgc',
                    language: 'en'
                }} />
            {/* </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'red'
    },
    innercontainer: {
        width: '100%',
        padding: 20,
        height: '100%'

    },
    map: {
        flex: 1,
        // backgroundColor: 'red',
    },
});

export default SearchPlaces;