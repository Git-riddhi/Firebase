import React, { useState, createRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import auth from "@react-native-firebase/auth";

const RegisterScreen = ({ navigation }) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errortext, setErrortext] = useState("");

    const emailInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext("");
        if (!userName) return alert("Please fill Name");
        if (!userEmail) return alert("Please fill Email");
        if (!userPassword) return alert("Please fill Address");

        auth()
            .createUserWithEmailAndPassword(
                userEmail,
                userPassword
            )
            .then((user) => {
                console.log(
                    "Registration Successful. Please Login to proceed"
                );
                console.log(user);
                if (user) {
                    auth()
                        .currentUser.updateProfile({
                            displayName: userName,
                            //   photoURL:
                            //     "https://aboutreact.com/profile.png",
                        })
                        .then(() => navigation.replace("HomeScreen"))
                        .catch((error) => {
                            alert(error);
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.code === "auth/email-already-in-use") {
                    setErrortext(
                        "That email address is already in use!"
                    );
                } else {
                    setErrortext(error.message);
                }
            });
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "#307ecc", paddingTop:20}}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex:1
                }}
            >
                
                <KeyboardAvoidingView enabled>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) =>
                                setUserName(UserName)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current &&
                                emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserEmail) =>
                                setUserEmail(UserEmail)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            ref={emailInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.sectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#8b9cb5"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errortext != "" ? (
                        <Text style={styles.errorTextStyle}>
                            {" "}
                            {errortext}{" "}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}
                    >
                        <Text style={styles.buttonTextStyle}>
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
            {/* <Text
                style={{
                    fontSize: 18,
                    textAlign: "center",
                    color: "white",
                }}
            >
                React Native Firebase Authentication
            </Text> */}
            {/* <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "white",
        }}
      >
        www.aboutreact.com
      </Text> */}
        </SafeAreaView>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    sectionStyle: {
        flexDirection: "row",
        height: 40,
        marginTop: 25,
        marginHorizontal:35,
    },
    buttonStyle: {
        backgroundColor: "#7DE24E",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        height: 40,
        alignItems: "center",
        borderRadius: 30,
        marginHorizontal:35,
        marginVertical:50
    },
    buttonTextStyle: {
        color: "#FFFFFF",
        paddingVertical: 10,
        fontSize: 16,
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
    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
    },
});