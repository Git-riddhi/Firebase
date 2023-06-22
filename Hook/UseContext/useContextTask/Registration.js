import React, { useContext, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
    TextInput,
    ScrollView,
} from "react-native";
import LoginContext from "./DataContext";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegistrationScreen = (props) => {
    const {
        email, setEmail,
        password, setPassword,
        checkEmail, setCheckEmail,
        checkPassword, setCheckPassword,
        firstName, setFirstName,
        lastName, setLastName,
        phoneNumber, setPhoneNumber,
        checkFirstName, setCheckFirstName,
        checkLastName, setCheckLastName,
        checkPhoneNumber, setCheckPhoneNumber
    } = useContext(LoginContext);

    // console.log('email==>', email);

    const name1 = (firstName) => {
        var firstNameRegex = /^[A-Za-z]{0,10}$/
        setFirstName(firstName)
        if (firstNameRegex.test(firstName)) {
            setCheckFirstName('')
        }
        else {
            setCheckFirstName('Please Enter Valid Name')
        }
    }

    const name2 = (lastName) => {
        var lastNameRegx = /^[A-Za-z]{0,10}$/
        setLastName(lastName)
        if (lastNameRegx.test(lastName)) {
            setCheckLastName('')
        }
        else {
            setCheckLastName('Please Enter Valid Name')
        }
    }


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

    const phoneNo = (phoneNumber) => {
        var phoneNoRegex = /^(\d{10})$/
        setPhoneNumber(phoneNumber)
        if (phoneNoRegex.test(phoneNumber)) {
            setCheckPhoneNumber('')
        }
        else {
            setCheckPhoneNumber('Please Enter Valid Phone Number')
        }
    }



    const SignUp = () => {
        var isValid = true;


        if (firstName == '') {
            isValid = false
            setCheckFirstName('First Name is Required')
        }
        else {
            setCheckFirstName('')
        }

        if (lastName == '') {
            isValid = false
            setCheckLastName('Last Name is Required')
        }
        else {
            setCheckLastName('')
        }

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

        if (phoneNumber == '') {
            isValid = false
            setCheckPhoneNumber('Phone number is Required')
        }
        else {
            setCheckPhoneNumber('')
        }


        return isValid;
    };


    const storeData = async () => {
        if ({ email, password, phoneNumber, firstName, lastName, phoneNumber }) {
            await AsyncStorage.setItem("Registerkey", JSON.stringify({ email, phoneNumber, password, firstName, lastName, phoneNumber }));
            // console.log('email-phoneNumber', email, phoneNumber);
        } else {
            console.log("not set data");
        }
    };



    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Registration</Text>
            {/* <ScrollView showsVerticalScrollIndicator={false} > */}

                <TextInput
                    placeholder="Enter First Name"
                    onChangeText={(firstName) => name1(firstName)}
                    style={styles.textInputStyle}
                    autoCapitalize="words"
                    placeholderTextColor="grey"
                    autoFocus={true}
                    value={firstName}
                />
                {checkFirstName ? (
                    <Text style={styles.checkText}>{checkFirstName}</Text>
                ) : (
                    <Text style={styles.checkText}></Text>
                )}


                <TextInput
                    placeholder="Enter Last Name"
                    onChangeText={(lastName) => name2(lastName)}
                    style={styles.textInputStyle}
                    autoCapitalize="words"
                    placeholderTextColor='grey'
                    value={lastName}

                />
                {checkLastName ? (
                    <Text style={styles.checkText}> {checkLastName}</Text>
                ) : (
                    <Text style={styles.checkText}></Text>
                )}



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

                <TextInput style={styles.textInputStyle}
                    placeholder='Enter Phone No.'
                    keyboardType="number-pad"
                    onChangeText={(phoneNumber) => phoneNo(phoneNumber)}
                    returnKeyType={'done'}
                    placeholderTextColor="grey"
                    value={phoneNumber}

                />
                {checkPhoneNumber ? (
                    <Text style={styles.checkText}>{checkPhoneNumber}</Text>
                ) : (
                    <Text style={styles.checkText}></Text>
                )}



                <View style={styles.button}>
                    <Button
                        title="Submit"
                        color={"purple"}
                        onPress={() => {
                            if (SignUp()) {
                                console.log("Success");
                                storeData();
                                props.navigation.navigate("Login");
                            }
                            else {
                                console.log("Not success");
                            }

                        }}
                    />
                </View>
            {/* </ScrollView> */}
        </View >
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

export default RegistrationScreen;
