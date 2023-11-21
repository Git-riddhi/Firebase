
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View , Button} from 'react-native';



const GoogleLoginWithFirebase = () => {

    GoogleSignin.configure({
        webClientId: '897245074098-6ck2n188hsjhqic8ovejk5a3j9bm5mec.apps.googleusercontent.com',
      });

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }




    return (
        <View style={styles.viewStyle}>
            <Button
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',


    },
    image: {


    }

});

export default GoogleLoginWithFirebase;
