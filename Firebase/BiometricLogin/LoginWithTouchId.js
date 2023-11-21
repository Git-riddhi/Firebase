import TouchID from "react-native-touch-id";
import React, { useEffect, useState } from 'react';
import { BackHandler, View, TouchableOpacity, Button, Alert } from "react-native";

const LoginWithTouchId = () => {
    const [isAuth, setIsAuth] = useState(false)

    const optionalConfigObject = {
        title: 'Provide Your Touch ID', // Android
        imageColor: '#000', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Slightly Touch sensor', // Android
        sensorErrorDescription: "Failed", // Android
        cancelText: "Cancel", // Android
        fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS
    };

    useEffect(() => {
        handleBiometric()
    }, [])

    const handleBiometric = () => {
        TouchID.isSupported().then((biometryType) => {
            if (biometryType === "FaceID" || biometryType === "TouchID") {
                console.log('Biometrics (Face ID/Touch ID) is supported.');
                TouchID.authenticate("", optionalConfigObject)
                    .then((success) => {
                        console.log('success===>', success);
                        if (success) {
                            setIsAuth(true);
                            // Authentication successful, proceed with your logic here
                        } else {
                            // Authentication failed
                            Alert.alert("Authentication Failed", "Please try again.");
                        }
                    })
                    .catch((error) => {
                        BackHandler.exitApp();
                        Alert.alert("Authentication Failed", error.message);
                    });
            } else {
                console.log('Biometrics is not supported on this device.');
                // Handle devices without biometric support
            }
        });
    };


    // const handleBiometric = () => {
    //     TouchID.isSupported().then((biometryType) => {
    //         if (biometryType === "FaceID") {
    //             console.log('Face ID is supported.');
    //         } else {
    //             console.log('Touch ID is supported.');
    //             if (isAuth) {
    //                 return null
    //             }
    //             TouchID.authenticate("", optionalConfigObject)
    //                 .then((success) => {
    //                     console.log('success===>', success);
    //                     setIsAuth(success)
    //                 })
    //                 .catch((error) => {
    //                     BackHandler.exitApp();
    //                     Alert.alert("Authentication Failed", error.message);
    //                 });
    //         }
    //     });
    // };

    return (
        <View style={{ marginTop: 10 }}>
            <TouchableOpacity style={{ flexWrap: 'wrap', alignSelf: 'center' }}>
                <Button title="Authenticate" onPress={handleBiometric} />
            </TouchableOpacity>
        </View>
    )
}

export default LoginWithTouchId
