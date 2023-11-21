import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressPickup = ({ placeholderText }) => {

    return (
        <View style={styles.container}>

            <GooglePlacesAutocomplete
                placeholder={placeholderText}
                onPress={(data, details = null) => {
                    console.log('data and details ===>', data, details);
                }}
                query={{
                    key: 'AIzaSyBNx-L2M4agAJ6gV9J8GktYUJHLJKUnWgc',
                    language: 'en'
                }}
                styles={{
                    textInputContainer: styles.containerStyle,
                    textInput: styles.textInputStyle

                }} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerStyle: {
        backgroundColor: 'white'
    },
    textInputStyle: {
        height: 50,
        color: 'black',
        fontSize: 16,
        backgroundColor: 'lightgrey'
    }
});

export default AddressPickup;