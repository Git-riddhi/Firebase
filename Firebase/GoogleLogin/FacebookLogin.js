

import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';



const FacebookLogin = () => {

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
      
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
      }


    return (
        <View style={styles.viewStyle}>
            <Button
                title="Facebook Sign-In"
                onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
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

export default FacebookLogin;
