import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';


import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SocialLogin = () => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);

    //    const statusCodes = {
    //         SIGN_IN_CANCELLED: GoogleSignin.SIGN_IN_CANCELLED,
    //         IN_PROGRESS: GoogleSignin.IN_PROGRESS,
    //         PLAY_SERVICES_NOT_AVAILABLE: GoogleSignin.PLAY_SERVICES_NOT_AVAILABLE,
    //         SIGN_IN_REQUIRED: GoogleSignin.SIGN_IN_REQUIRED,
    //     };
    //     console.log("statusCodes", statusCodes);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '607242806919-ldjbbtmp8sf4811usd1bnco3kgqg6oem.apps.googleusercontent.com',
        });
    }, [])

    const GoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { accessToken, idToken } = await GoogleSignin.signIn();
            setloggedIn(true);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }
    const GoogleSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setuserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    // const GoogleSignIn = async () => {
    //     // Check if your device supports Google Play
    //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //     // Get the users ID token
    //     const { idToken } = await GoogleSignin.signIn();

    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);


    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(googleCredential);
    // }

    return (

        <View style={styles.container}>

            <Button
                title="Google Sign-In"

                onPress={() => GoogleSignIn().then(() => console.log('Signed in with Google!'))}
            />

            <Button
                title="Google Sign-Out"
            onPress={() => GoogleSignOut().then(() => console.log('Signed in with Google!'))}

            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },

    title: {
        fontSize: 22,
        fontWeight: '700',

    },
    btnBox: {
        paddingVertical: 10,
        backgroundColor: 'coral',
        paddingHorizontal: 20

    }
});

export default SocialLogin;