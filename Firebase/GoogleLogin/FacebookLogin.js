
// Without Fb LoginButton


import React, { useEffect, useState } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LoginManager, AccessToken, Profile } from "react-native-fbsdk-next";
import auth from '@react-native-firebase/auth';

const FacebookLogin = () => {

    
    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions([
            "public_profile",
            "email",
        ]);

        console.log("result ===>", result);

        if (result.isCancelled) {
            throw "User cancelled the login process";
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        console.log("data ===.", data);

        if (!data) {
            throw "Something went wrong obtaining access token";
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken
        );

        console.log("facebookCredential ===.", facebookCredential);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    // const currentProfile = Profile.getCurrentProfile().then(
    //     function (currentProfile) {
    //         if (currentProfile) {
    //             console.log("currentProfile ==>", currentProfile);
    //             setProfileImage(currentProfile.imageURL);
    //             console.log("The current logged user is: " +
    //                 currentProfile.name
    //                 + ". His profile id is: " +
    //                 currentProfile.userID
    //             );
    //         }
    //     }
    // );

    return (
        <View style={styles.viewStyle}>
            <Button
                title="Facebook Sign-In"
                onPress={() =>
                    onFacebookButtonPress().then(() =>
                        console.log("Signed in with Facebook!")
                        
                    )
                }
            />
        </View>
    );


};

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {},
});

export default FacebookLogin;
