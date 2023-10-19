import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, ScrollView, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AddressPickup from './AddressPickup';

const ChooseLocation = () => {
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled"
             style={{backgroundColor:'white', flex:1}}>
                {/* <Text>Riddhi</Text> */}

                <AddressPickup
                    placeholderText="Enter Pickup Location" />

                <AddressPickup
                    placeholderText="Enter Destination Location" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },

});

export default ChooseLocation;