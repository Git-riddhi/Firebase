
// Using Fb LoginButton



import React, { useEffect, useState } from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    LoginManager,
    AccessToken,
    LoginButton,
    Profile,
} from "react-native-fbsdk-next";

const FacebookSignin = () => {

    const [profileImage, setProfileImage] = useState("");
    const [name, setName] = useState('')

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions([
            "public_profile",
            "email",
        ]);

        if (result.isCancelled) {
            throw "User cancelled the login process";
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw "Something went wrong obtaining access token";
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken
        );

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }

    return (
        <View style={styles.viewStyle}>
            <View>



                <LoginButton
                    onLoginFinished={(error, result) => {
                        if (error) {
                            console.log("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then((data) => {
                                console.log(
                                    "data.accessToken.toString()===>",
                                    data.accessToken.toString()
                                );
                            });
                            const currentProfile = Profile.getCurrentProfile().then(function (
                                currentProfile
                            ) {
                                if (currentProfile) {
                                    console.log("currentProfile ==>", currentProfile);
                                    setProfileImage(currentProfile.imageURL);
                                    console.log(
                                        "The current logged user is: " +
                                        currentProfile.name +
                                        ". His profile id is: " +
                                        currentProfile.userID
                                    );
                                    setName(currentProfile.name)
                                }
                            });
                        }
                    }}
                    onLogoutFinished={() => {
                        console.log("Logout");
                        setProfileImage("");
                    }}
                />
            </View>

            {name !== "" && (
                <Text style={styles.textStyle}>WelCome {name}</Text>
            )}
            {profileImage !== "" && (
                <Image source={{ uri: profileImage }} style={styles.imageStyle} />
            )}

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
        textAlign: 'center',
        marginTop: 40,
    },
    buttonStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageStyle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 50,
        alignSelf: "center",
    },
});

export default FacebookSignin;

// For it to work you need to:

// Run the app on a real device
// Have the facebook app running in the background and logged in to an account
// Have that account you used on Facebook added as an "Advertising Account" for your app on Facebook's dashboard
// MOST IMPORTANT: Have ATT enabled both on the FACEBOOK APP and YOUR APP.
