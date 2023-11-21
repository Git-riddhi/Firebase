import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const GoogleLogin = () => {

    // const [loggedIn, setloggedIn] = useState(false);
    const [state, setState] = useState();
    console.log('state value ===>', state)

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '151306368243-jomijdvllp2f16i3lsg54uu02m2udghc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);


    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();
            setState({ userInfo });
            console.log("userInfo", userInfo)



        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
            console.log('error ===>', error);
        }
    };



    // const signOut = async () => {
    //     try {
    //         await GoogleSignin.revokeAccess();
    //         await GoogleSignin.signOut();
    //         auth()
    //             .signOut()
    //             .then(() => alert('Your are signed out!'));
    //         setState(false);
    //         // setuserInfo([]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };



    return (
        <View style={styles.viewStyle}>
            {/* 
            {state != null && <Text style={styles.textStyle}>{state.name}</Text>}
            {state != null && <Text style={styles.textStyle}>{state.email}</Text>}
            {
                state == null
                    ?  */}
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => { signIn() }}

            />
            {/* // : <Text style={styles.textStyle} onPress={signOut}>Signout</Text>

                //     <View>
                //     <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />
                //     <Text>Name: {name}</Text>
                //     <Text>Email: {email}</Text>
                //   </View> */}
            {/* // } */}
        </View>
    );
};
//    <View style={styles.buttonContainer}>
//             {!loggedIn && <Text>You are currently logged out</Text>}
//             {loggedIn && (
//                 <Button
//                     onPress={signOut}
//                     title="LogOut"
//                     color="red"></Button>
//             )}
//         </View> 
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

export default GoogleLogin;
