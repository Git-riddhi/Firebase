// #6 Email Authentication using Firebase Authentication in React Native App
// https://aboutreact.com/react-native-firebase-authentication/

// Import React and Component
import React, { useState, createRef, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from "react-native";

import auth from "@react-native-firebase/auth";

const ForgotPasswordScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errortext, setErrortext] = useState("");

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext("");
        if (!userEmail) {
            Alert.alert("Please fill Email");
            return;
        }
        if (!userPassword) {
            Alert.alert("Please fill Password");
            return;
        }
        auth()
            .signInWithEmailAndPassword(userEmail, userPassword)
            .then((user) => {
                console.log(user);
                // If server response message same as Data Matched
                if (user) navigation.replace("HomeScreen");
            })
            .catch((error) => {
                console.log(error);
                if (error.code === "auth/invalid-email")
                    setErrortext(error.message);
                else if (error.code === "auth/user-not-found")
                    setErrortext("No User Found");
                else {
                    setErrortext(
                        "Please check your email id or password"
                    );
                }
            });
    };

    const resetPassword = () => {
        if (userEmail !== "") {
            auth()
                .sendPasswordResetEmail(userEmail)
                .then(() => {
                    Alert.alert("Password reset email has been sent successfully.");
                    navigation.navigate('Login')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Alert.alert(errorMessage);
                });
        } else {
            Alert.alert("Please enter your valid email");
        }
    };

    return (
        <SafeAreaView style={styles.mainBody}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1
                }}
            >
                <View style={{alignItems:'center'}}> 
                    <KeyboardAvoidingView enabled>
                        <View >
                            <Text style={{ fontSize: 20, color: 'white', fontWeight:'bold',marginBottom:60, textAlign:'center' }}>
                                FORGOT PASSWORD
                            </Text>
                        </View>

                        <Text style={{ fontSize: 14, color: 'white', textAlign:'center' }}>
                            Enter your email address to reset your password.
                        </Text>

                        <View style={styles.sectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserEmail(UserEmail)
                                }
                                placeholder="Enter Email"
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />

                        </View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={resetPassword}
                        >
                            <Text style={styles.buttonTextStyle}>
                                RESET PASSWORD
                            </Text>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        backgroundColor: "#307ecc",
        alignContent: "center",
        paddingTop:30
    },
    sectionStyle: {
        flexDirection: "row",
        height: 40,
        width:'85%',
        marginTop: 30,
        marginHorizontal: 35,
    },
   
    buttonStyle: {
        backgroundColor: "#7DE24E",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        height: 40,
        alignItems: "center",
        borderRadius: 30,
        marginHorizontal: 35,
        marginVertical: 30
    },
    buttonTextStyle: {
        color: "#FFFFFF",
        paddingVertical: 10,
        fontSize: 16,
        fontWeight:'bold'
    },
    inputStyle: {
        flex: 1,
        color: "white",
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#dadae8",
    },
    registerTextStyle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14,
        alignSelf: "center",
        padding: 10,
    },
    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
    },
    forgotButtonText: {
        fontSize: 13,
        color: 'white', textAlign: 'center',
        marginBottom: 50
    }
});