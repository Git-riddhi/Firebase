import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Button,
    Image,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator
} from "react-native";

const Login = (props) => {

    // Use states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [checkEmail, setCheckEmail] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const firstTextInput = useRef();


    // Validation Regex
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


    // Function for Validation
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


    // Function for get data from Registerkey of asyncstorage
    const getData = async () => {
        setLoading(true); // Show loader
        const showItem = await AsyncStorage.getItem("Registerkey");
        const getItem = JSON.parse(showItem);

        console.log("registeritem get data ==", getItem);

        if (getItem == null) {
            Alert.alert("Please register yourself first.");
            setEmail("");
            setPassword("");
            setLoading(false)
        }

        // const emails = getItem.map((dataobj) => dataobj.email)
        // console.log(emails,"emails array")

        const loginObj = {
            email: email,
            password: password,
        };
        // console.log("loginObj.email ===>", loginObj.email);

        const existingEmail = getItem.filter((item) => {
            const oldEmail = item.email;
            const oldPassword = item.password;

            // console.log(oldEmail, oldPassword, "=======> oldEmail, oldPassword");

            if (oldEmail == loginObj.email && oldPassword == loginObj.password) {
                console.log("condition true");

                return item;
            }

        });

        console.log("existingEmail ===>", existingEmail);

        if (existingEmail.length !== 0) {
            await AsyncStorage.setItem("Loginkey", JSON.stringify(existingEmail));

            props.navigation.replace('BottomTab');
            setEmail("");
            setPassword("");
            setLoading(false);
        } else {
            setLoading(false);
            Alert.alert("Invalid credentials. Please try again.");

        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/background.png")}
                resizeMode="cover"
                style={styles.image}
            >
                {/* <Text style={styles.headertext}>LogIn </Text> */}

                <View style={styles.innercontainer}>
                    <TextInput
                        placeholder="Enter Email"
                        onChangeText={(email) => mail(email)}
                        style={styles.textInputStyle}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType={"next"}
                        value={email}
                        onSubmitEditing={() => {
                            firstTextInput.current.focus();
                        }}
                    />
                    {checkEmail ? (
                        <Text style={styles.checkText}>{checkEmail}</Text>
                    ) : (
                        <Text style={styles.checkText}></Text>
                    )}

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        onChangeText={(password) => pwd(password)}
                        returnKeyType={"done"}
                        value={password}
                        ref={firstTextInput}
                    />
                    {checkPassword ? (
                        <Text style={styles.checkText}>{checkPassword}</Text>
                    ) : (
                        <Text style={styles.checkText}></Text>
                    )}
                </View>



                <View style={styles.Login}>
                    <TouchableOpacity onPress={() => {
                        if (Login()) {
                            getData();
                        }
                    }}>

                        <Text style={styles.LoginButtonText}> LOGIN </Text>

                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {
                    console.log('forgotpassword.....')
                    // props.navigation.navigate('ForgotPassword')
                }
                }>
                    <Text style={styles.forgotButtonText}> Forgot Password ? </Text>
                </TouchableOpacity>

                <View style={styles.SignUp}>
                    <Text style={styles.footerText}>Or create account</Text>
                    <Text style={styles.SignUpButtonText}> SignUp </Text>

                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("SignUp");
                        }}
                        style={styles.aerrowTouch}
                    >
                        <Image
                            source={require("../../assets/right-arrow.png")}
                            style={styles.rightAerrowButton}
                        />
                    </TouchableOpacity>
                </View>

                {loading && (

                    <ActivityIndicator
                        style={styles.loader}
                        size={30}
                        color="orange"
                    />

                )}
            </ImageBackground>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    innercontainer: {
        alignItems: "center",
    },
    headertext: {
        fontWeight: "bold",
        fontSize: 25,
        color: "white",
        alignSelf: "center",
        marginVertical: 40,
    },

    checkText: {
        color: "red",
        textAlign: "center",
    },

    textInputStyle: {
        borderRadius: 20,
        backgroundColor: "white",
        width: "80%",
        padding: 7,
        elevation: 5,
        marginHorizontal: 20,
        marginTop: 5,
    },

    image: {
        flex: 1,
        justifyContent: "center",
    },
    Login: {
        borderRadius: 20,
        backgroundColor: "orange",
        width: "80%",
        padding: 10,
        elevation: 6,
        marginHorizontal: 40,
        marginTop: 5,
    },
    LoginButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },

    SignUpButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },

    SignUp: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 30,
        marginVertical: 50
    },

    aerrowTouch: {
        backgroundColor: "orange",
        padding: 7,
        borderRadius: 20,
        marginRight: 20,
    },

    rightAerrowButton: {
        height: 25,
        width: 25,
        tintColor: "white",
    },

    footerText: {
        fontSize: 15,
        color: "orange",
        alignSelf: "center",
        fontWeight: "bold",
        margin: 10,
    },
    loader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    },
    forgotButtonText: {
        fontSize: 15,
        color: 'white', textAlign: 'center',
        marginTop: 15
    }
});

export default Login;
