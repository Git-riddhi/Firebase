import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useRef } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    ImageBackground,
    Modal,
    Button
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SignUp = (props) => {
    // UseStates
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isConfirmPasswordSecure, setConfirmIsPasswordSecure] = useState(true);


    const [image, setImage] = useState();
    const [isModalVisible, setModalVisible] = useState(false);

    const [checkFirstName, setCheckFirstName] = useState("");
    const [checkLastName, setCheckLastName] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const [checkConfirmEmail, setCheckConfirmEmail] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [checkConfirmPassword, setCheckConfirmPassword] = useState("");
    const [checkPhoneNumber, setCheckPhoneNumber] = useState("");

    // Use Reference
    const firstTextInput = useRef();
    const secondTextInput = useRef();
    const thirdTextInput = useRef();
    const fourthTextInput = useRef();
    const fifthTextInput = useRef();
    const sixthTextInput = useRef();

    // Validation Regex
    const name1 = (firstName) => {
        var firstNameRegex = /^[A-Za-z]{0,10}$/;
        setFirstName(firstName);
        if (firstNameRegex.test(firstName)) {
            setCheckFirstName("");
        } else {
            setCheckFirstName("Please Enter Valid Name");
        }
    };

    const name2 = (lastName) => {
        var lastNameRegx = /^[A-Za-z]{0,10}$/;
        setLastName(lastName);
        if (lastNameRegx.test(lastName)) {
            setCheckLastName("");
        } else {
            setCheckLastName("Please Enter Valid Name");
        }
    };

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

    const confirmMail = (confirmEmail) => {
        setConfirmEmail(confirmEmail);
        if (email === confirmEmail) {
            setCheckConfirmEmail("");
        } else {
            setCheckConfirmEmail("Email and confirmEmail should be same.");
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

    const confirmPwd = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
        if (password === confirmPassword) {
            setCheckConfirmPassword("");
        } else {
            setCheckConfirmPassword("Password and confirmPassword should be same.");
        }
    };

    const phoneNo = (phoneNumber) => {
        var phoneNoRegex = /^(\d{10})$/;
        setPhoneNumber(phoneNumber);
        if (phoneNoRegex.test(phoneNumber)) {
            setCheckPhoneNumber("");
        } else {
            setCheckPhoneNumber("Please Enter Valid Phone Number");
        }
    };

    // Function For Validation
    const SignUp = () => {
        var isValid = true;

        if (firstName == "") {
            isValid = false;
            setCheckFirstName("First Name is Required");
        } else {
            setCheckFirstName("");
        }

        if (lastName == "") {
            isValid = false;
            setCheckLastName("LastName is Required");
        } else {
            setCheckLastName("");
        }

        if (email == "") {
            isValid = false;
            setCheckEmail("Email address is Required");
        } else {
            setCheckEmail("");
        }

        if (confirmEmail == "") {
            isValid = false;
            setCheckConfirmEmail(" Email address is Required");
        } else {
            setCheckConfirmEmail("");
        }

        if (password == "") {
            isValid = false;
            setCheckPassword("Password is Required");
        } else {
            setCheckPassword("");
        }

        if (confirmPassword == "") {
            isValid = false;
            setCheckConfirmPassword("Password is Required");
        } else {
            setCheckConfirmPassword("");
        }

        if (phoneNumber == "") {
            isValid = false;
            setCheckPhoneNumber("Phone number is Required");
        } else {
            setCheckPhoneNumber("");
        }

        return isValid;
    };

    // function for getting unique id 
    const orderId = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

    };

    // Function for set Profile Image from 
    
    // const handleImagePicker = async () => {
    //     try {
    //         const pickedImage = await ImagePicker.openPicker({
    //             width: 300,
    //             height: 300,
    //             cropping: true,
    //         });

    //         if (pickedImage) {
    //             setImage(pickedImage.path);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const openImagePicker = async (type) => {
        try {
            let image = null;
            if (type === 'camera') {
                image = await ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                });
            } else {
                image = await ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                });
            }
            if (image) {
                setImage(image.path);
                setModalVisible(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const handleCameraPicker = async () => {
    //     try {
    //       const pickedImage = await ImagePicker.openCamera({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //       });
    //       setImage(pickedImage.path);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    // Function for Data store in Localstorage
    const storeData = async () => {
        const infoData = {
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            image: image,
            'userid': orderId()
        };

        var alreadyRegisteredUserData = false;

        try {
            const existingValue = await getTransaction(infoData);
            console.log("existingValue ===>", existingValue);

            if (existingValue.length == 0) {
                const updatedValue = [infoData];

                console.log("updatedValue ===>", updatedValue);
                await AsyncStorage.setItem("Registerkey", JSON.stringify(updatedValue));
                Alert.alert("Signup", "SignUp successfull", [
                    {
                        text: "OK",
                        onPress: () => props.navigation.navigate("Login"),
                    },
                ]);
            } else {

                // existingValue.map((dataobj)=>{
                //   if (
                //     dataobj?.email === infoData?.email ||
                //     dataobj?.phoneNumber === infoData?.phoneNumber
                //   ) {
                //     alreadyRegisteredUserData = true;

                //   }
                // })

                for (let dataobj of existingValue) {
                    if (
                        dataobj?.email === infoData?.email ||
                        dataobj?.phoneNumber === infoData?.phoneNumber
                    ) {
                        alreadyRegisteredUserData = true;
                        break;
                    }
                }

                if (alreadyRegisteredUserData) {
                    Alert.alert("User already exist.");
                } else {
                    const updatedValue = [...existingValue, infoData];

                    console.log("updatedValue", updatedValue);



                    AsyncStorage.setItem("Registerkey", JSON.stringify(updatedValue));
                    Alert.alert("Signup", "SignUp successfull", [
                        {
                            text: "OK",
                            onPress: () => props.navigation.navigate("Login"),
                        },
                    ]);
                }

            }
        } catch (err) {
            console.log("error ===>", err);
        }
    };

    const getTransaction = async (item) => {
        let transactions = await AsyncStorage.getItem("Registerkey");
        if (transactions) {
            return JSON.parse(transactions);
        } else {
            return [];
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/background.png")}
                resizeMode="cover"
                style={styles.image}
            >

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20 }}>

                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate("Login");
                        }}
                    >
                        <Image
                            source={require("../../assets/arrow.png")}
                            style={styles.leftAerrowButton}
                        />
                    </TouchableOpacity>

                    <Text style={styles.text}> Create Account </Text>


                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.profileImageStyle} />
                        ) : (
                            <View style={styles.imagePickerView}>
                                <Text style={{ fontSize: 40 }}>+</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>


                    <TextInput
                        placeholder="Enter First Name"
                        onChangeText={(firstName) => name1(firstName)}
                        style={styles.textInputStyle}
                        autoCapitalize="words"
                        returnKeyType={"next"}
                        // autoFocus={true}
                        value={firstName}
                        onSubmitEditing={() => {
                            firstTextInput.current.focus();
                        }}
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
                        placeholderTextColor="grey"
                        returnKeyType={"next"}
                        value={lastName}
                        ref={firstTextInput}
                        onSubmitEditing={() => {
                            secondTextInput.current.focus();
                        }}
                    />
                    {checkLastName ? (
                        <Text style={styles.checkText}> {checkLastName}</Text>
                    ) : (
                        <Text style={styles.checkText}></Text>
                    )}

                    <TextInput
                        placeholder="Enter Email"
                        onChangeText={(email) => mail(email)}
                        style={styles.textInputStyle}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType={"next"}
                        value={email}
                        ref={secondTextInput}
                        onSubmitEditing={() => {
                            thirdTextInput.current.focus();
                        }}
                    />
                    {checkEmail ? (
                        <Text style={styles.checkText}>{checkEmail}</Text>
                    ) : (
                        <Text style={styles.checkText}></Text>
                    )}

                    <TextInput
                        placeholder="Enter Confirm Email"
                        onChangeText={(confirmEmail) => confirmMail(confirmEmail)}
                        style={styles.textInputStyle}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType={"next"}
                        value={confirmEmail}
                        ref={thirdTextInput}
                        onSubmitEditing={() => {
                            fourthTextInput.current.focus();
                        }}
                    />
                    {checkConfirmEmail ? (
                        <Text style={styles.checkText}>{checkConfirmEmail}</Text>
                    ) : (
                        <Text style={styles.checkText}></Text>
                    )}

                    <View style={styles.passwordInputView}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Enter Password"
                            secureTextEntry={isPasswordSecure}
                            onChangeText={(password) => pwd(password)}
                            returnKeyType={"next"}
                            value={password}
                            ref={fourthTextInput}
                            onSubmitEditing={() => {
                                fifthTextInput.current.focus();
                            }}
                        />
                        <MaterialCommunityIcons
                            name={isPasswordSecure ? "eye-off" : "eye"}
                            size={24}
                            style={styles.eyeIconStyle}
                            color={"black"}
                            onPress={() => {
                                isPasswordSecure
                                    ? setIsPasswordSecure(false)
                                    : setIsPasswordSecure(true);
                            }}
                        />
                    </View>
                    {checkPassword ? (
                        <Text style={styles.checkText}>{checkPassword}</Text>
                    ) : (
                        <Text style={styles.checkText}></Text>
                    )}

                    <View style={styles.passwordInputView}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Enter Confirm Password"
                            secureTextEntry={isConfirmPasswordSecure}
                            onChangeText={(confirmPassword) => confirmPwd(confirmPassword)}
                            returnKeyType={"next"}
                            value={confirmPassword}
                            ref={fifthTextInput}
                            onSubmitEditing={() => {
                                sixthTextInput.current.focus();
                            }}
                        />
                        <MaterialCommunityIcons
                            name={isConfirmPasswordSecure ? "eye-off" : "eye"}
                            size={24}
                            style={styles.eyeIconStyle}
                            color={"black"}
                            onPress={() => {
                                isConfirmPasswordSecure
                                    ? setConfirmIsPasswordSecure(false)
                                    : setConfirmIsPasswordSecure(true);
                            }}
                        />
                    </View>
                    {checkConfirmPassword ? (
                        <Text style={styles.checkText}> {checkConfirmPassword} </Text>
                    ) : (
                        <Text style={styles.checkText}></Text>
                    )}

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter Phone No."
                        keyboardType={"numeric"}
                        onChangeText={(phoneNumber) => phoneNo(phoneNumber)}
                        returnKeyType={"done"}
                        value={phoneNumber}
                        ref={sixthTextInput}
                    />
                    {checkPhoneNumber ? (
                        <Text style={styles.checkText}>{checkPhoneNumber}</Text>
                    ) : (
                        <Text style={styles.checkText}></Text>
                    )}

                    <View style={styles.signup}>
                        <Text style={styles.signUpButtonText}> Sign Up </Text>

                        <TouchableOpacity
                            onPress={() => {
                                if (SignUp()) {
                                    storeData();
                                }
                                // else {
                                //   // console.log("Not success");
                                //   Alert.alert("Not Success")
                                // }
                            }}
                            style={styles.aerrowTouch}
                        >
                            <Image
                                source={require("../../assets/right-arrow.png")}
                                style={styles.rightAerrowButton}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.footerText}>Or create account using</Text>

                    <View style={styles.footer}>
                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/facebook.png")}
                                style={{ height: 30, width: 30, resizeMode: "cover" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/twitter.png")}
                                style={{
                                    height: 30,
                                    width: 30,
                                    resizeMode: "cover",
                                    marginLeft: 30,
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/search.png")}
                                style={{
                                    height: 30,
                                    width: 30,
                                    resizeMode: "cover",
                                    marginLeft: 30,
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Button title="Open Camera" onPress={() => openImagePicker('camera')} color={'#4169e1'}  />
                                <Button title="Open Album" onPress={() => openImagePicker('album')} color={'#4169e1'}/>
                                <Button title="Cancel" onPress={() => setModalVisible(false)} color={'#4169e1'}/>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    leftAerrowButton: {
        height: 25,
        width: 25,
        resizeMode: "cover",
        justifyContent: "flex-start",
        tintColor: 'white'
    },
    profileImageStyle: {
        width: 50,
        height: 50,
        marginTop: 10,
        borderRadius: 30
    },
    imagePickerView: {
        width: 50,
        height: 50,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 20
    },

    text: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    },

    checkText: {
        color: "red",
        textAlign: "center",
    },
    passwordInputView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: 5,
    },
    eyeIconStyle: {
        position: "absolute",
        right: 50,
    },

    textInputStyle: {
        borderRadius: 20,
        width: "84%",
        alignSelf: "center",
        backgroundColor: "white",
        padding: 7,
        elevation: 5,
        marginTop: 5,
    },

    image: {
        flex: 1,
        justifyContent: "center",
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },

    footerText: {
        fontSize: 17,
        color: "white",
        alignSelf: "center",
        fontWeight: "bold",
        margin: 10,
    },

    signUpButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },

    signup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 10,
    },

    aerrowTouch: {
        backgroundColor: "orange",
        padding: 7,
        borderRadius: 20,
        marginRight: 20,
    },

    rightAerrowButton: {
        height: 30,
        width: 30,
        tintColor: "white",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default SignUp;
