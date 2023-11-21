import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const GoogleLogin2 = () => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    const signIn = async () => {
        GoogleSignin.configure({
            webClientId: '297319317691-kod9fuovor5be34biai5qomks6pvgrmd.apps.googleusercontent.com',
        });
        console.log("onGoogleButtonPress====");
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        console.log("await GoogleSignin.signIn();===", { idToken });

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        console.log("googleCredential===", googleCredential);
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    // const signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const { accessToken, idToken } = await GoogleSignin.signIn();
    //         setloggedIn(true);
    //         const credential = auth.GoogleAuthProvider.credential(
    //             idToken,
    //             accessToken,
    //           );
    //           await auth().signInWithCredential(credential);
    //           console.log('credential===>', credential);

    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //             alert('Cancel');
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             alert('Signin in progress');
    //             // operation (f.e. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             alert('PLAY_SERVICES_NOT_AVAILABLE');
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //         console.log('error ===>', error);
    //     }
    // };

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
                .then(() => alert('Your are signed out!'));
            setloggedIn(false);
            // setuserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.viewStyle}>

            {/* {state != null && <Text style={styles.textStyle}>{state.name}</Text>}
            {state != null && <Text style={styles.textStyle}>{state.email}</Text>}
            {state == null ? */}

            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}

            />

            <View style={styles.buttonContainer}>
                {!loggedIn && <Text>You are currently logged out</Text>}
                {loggedIn && (
                    <Button
                        onPress={signOut}
                        title="LogOut"
                        color="red"></Button>
                )}
            </View>
            {/* : <Text style={styles.textStyle} onPress={signOut}>Signout</Text>} */}
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

export default GoogleLogin2;
