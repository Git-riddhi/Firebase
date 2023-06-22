import React, { useContext, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
    TextInput,
} from "react-native";
import LoginContext from "./DataContext";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        checkEmail,
        setCheckEmail,
        checkPassword,
        setCheckPassword,
        isLogin,
        setIsLogin,
    } = useContext(LoginContext);

    // console.log('email==>', email);

    const mail = (email) => {
        var emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        setEmail(email);
        if (emailRegex.test(email)) {
            setCheckEmail("");
        } else {
            setCheckEmail("Please Enter Valid Email address");
        }
    };

    const pwd = (password) => {
        var passRegex =
            /^.*(?=.{6,10})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?_~()-]*).*$/;
        setPassword(password);
        if (passRegex.test(password)) {
            setCheckPassword("");
        } else {
            setCheckPassword("Please Enter Valid Password");
        }
    };

    const Login = () => {
        var isValid = true;

        if (email == "") {
            isValid = false;
            setCheckEmail("Email address is Required");
        } else {
            setCheckEmail("");
        }

        if (password == "") {
            isValid = false;
            setCheckPassword("Password is Required");
        } else {
            setCheckPassword("");
        }
        return isValid;
    };

    useEffect(() => {
        getData();
    }, []);

    const storeData = async () => {
        if ({ email, password }) {
            await AsyncStorage.setItem("Loginkey", JSON.stringify({ email, password }));
            // console.log('email-password', email, password);
        } else {
            console.log("not set data");
        }
    };

    const getData = async () => {
        const getItem = await AsyncStorage.getItem("Loginkey");

        if (getItem != null) {
            setTimeout(() => {
                props.navigation.navigate("Home");
            }, 10);
        } else {
            props.navigation.navigate("Login");
        }
        console.log("getItem ====>", getItem);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>

            <TextInput
                placeholder="Enter Email"
                onChangeText={(email) => mail(email)}
                value={email}
                style={styles.textInputStyle}
                keyboardType="email-address"
                placeholderTextColor="grey"
            />
            {checkEmail ? (
                <Text style={styles.checkText}>{checkEmail}</Text>
            ) : (
                <Text style={styles.checkText}></Text>
            )}

            <TextInput
                placeholder="Enter Password"
                onChangeText={(password) => pwd(password)}
                value={password}
                secureTextEntry={true}
                style={styles.textInputStyle}
                keyboardType="email-address"
                placeholderTextColor="grey"
            />
            {checkPassword ? (
                <Text style={styles.checkText}>{checkPassword}</Text>
            ) : (
                <Text style={styles.checkText}></Text>
            )}

            <View style={styles.button}>
                <Button
                    title="Login"
                    color={"purple"}
                    onPress={() => {
                        if (Login()) {
                            console.log("Success");
                            storeData();
                            props.navigation.navigate("Home");
                        }
                        else {
                            console.log("Not success");
                        }

                    }}
                />


            </View>


            <View style={styles.button}>
                <Button
                    title="Register"
                    color={"purple"}
                    onPress={() => {
                        props.navigation.navigate("SignUp");
                    }}

                />


            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    heading: {
        fontSize: 20,
        color: "purple",
        fontWeight: "bold",
        marginBottom: 70,
    },
    textInputStyle: {
        width: "75%",
        borderRadius: 20,
        backgroundColor: "purple",
        color: "white",
        padding: 7,
        marginTop: 20,
    },
    button: {
        marginVertical: 20,
    },

    checkText: {
        color: "red",
        fontSize: 13,
        textAlign: "center",
    },
});

export default LoginScreen;
