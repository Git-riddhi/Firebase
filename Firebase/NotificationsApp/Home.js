import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, Button, Dimensions, ImageBackground, ToastAndroid } from "react-native";
import {
    View,
    StyleSheet,
    Text,
    Alert,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import notifee, { AndroidStyle } from '@notifee/react-native';
import { NotificationServices, getFcmToken, requestUserPermission } from "../PushNotification";
import messaging from '@react-native-firebase/messaging';
import { Badge } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CartOutlineIcon from 'react-native-vector-icons/Ionicons'
import { PushNotification } from "react-native-push-notification";

const deviceWidth = Dimensions.get("screen").width;
const deviceheight = Dimensions.get("screen").height;

const Home = (props) => {
    // states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState();

    // Badge count
    const [badgeCount, setBadgeCount] = useState(0);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            remoteMessage
            // console.log("remoteMessage.notification.title", remoteMessage.notification.title);

            setBadgeCount(badgeCount + 1);
        });

        return unsubscribe;
    }, [badgeCount]);


    // device back button handling
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);


    const handleBackButtonClick = () => {
        props.navigation.pop(2)
    }

    useFocusEffect(
        React.useCallback(() => {
            getNameAndImageFromSignup();
        }, []));


    // Function for get firstname from Loginkey of asyncstorage
    const getNameAndImageFromSignup = async () => {
        try {
            const showItem = await AsyncStorage.getItem("Loginkey");
            console.log('login showItem===', showItem);

            if (showItem !== null) {
                const result = JSON.parse(showItem);
                setFirstName(result[0].firstName);
                setLastName(result[0].lastName)
                setImage(result[0].image)
                return showItem;
            }
        } catch (error) {
            console.log("error ===>", error);
        }
    };

    // Function for Logout
    const LogOut = async () => {
        try {
            props.navigation.navigate("Login");
            await AsyncStorage.removeItem("Loginkey");
            // await AsyncStorage.clear();
            console.log("Log out successfully");
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            // Handle foreground notification
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

            // Display a toast notification with the message body
            ToastAndroid.showWithGravityAndOffset(
                remoteMessage.notification.body,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50
            );
        });

        return () => {
            unsubscribeOnMessage();
        };
    }, []);

    // useEffect(() => {
    //     requestUserPermission();
    //     getFcmToken();
    //     NotificationServices()

    // }, []);


    const onDisplayNotification = async () => {
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId,
                // style: { type: AndroidStyle.BIGTEXT, text: 'Hello my name is Riddhi. I am working on react native. In react native, I am working on frebase push notification.' },
                style: { type: AndroidStyle.BIGPICTURE, picture: require('../../assets/splash.png') },
                // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/background.png")}
                resizeMode="cover"
                style={styles.ImageBackground}
            >

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={styles.firstView}>
                        <Image source={{ uri: image }} style={styles.profileImageStyle} />
                        <View>
                            <Text style={styles.heading}>Hello,</Text>
                            <Text style={styles.heading}>{firstName} {lastName}</Text>
                        </View>
                    </View>

                    <View style={styles.iconsContainer}>
                        <TouchableOpacity style={styles.icon}>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} onPress={() => {props.navigation.navigate('AddToCart') }}>
                            <CartOutlineIcon name="cart-outline" color={'white'} size={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Display Notification" onPress={() => { onDisplayNotification() }} />

                    <TouchableOpacity
                        onPress={() => {
                            setBadgeCount(0);

                        }}
                    >
                        <Image source={require('../../assets/chatIcon.png')} style={styles.iconstyle} />
                        <Badge

                            visible={badgeCount > 0}
                            size={25}
                            style={{ position: 'absolute', top: 15, right: 0, backgroundColor: 'orange' }}
                        >
                            {badgeCount}
                        </Badge>
                    </TouchableOpacity>
                </View> */}


                <TouchableOpacity
                    style={styles.logoutView}
                    onPress={() => {
                        LogOut();
                    }}
                >
                    <Text style={styles.logoutButtonStyle}>Log Out</Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ImageBackground: {
        flex: 1,
    },
    heading: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    image: {
        height: 35,
        width: 35,
        tintColor: "white",
    },
    iconViewstyle: {
        width: deviceWidth / 2,
        height: deviceheight / 10,
        flexDirection: "row",
        alignItems: "center",
    },
    iconStyle: {
        height: 40,
        width: 40,
        marginHorizontal: 20,
    },
    firstView: {
        justifyContent: "space-between",
        margin: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImageStyle: {
        width: 50,
        height: 50,
        // marginTop: 10,
        marginRight:10,
        borderRadius: 30
    },
    logoutView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    logoutButtonStyle: {
        width: "30%",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        borderRadius: 20,
        alignSelf: "center",
        textAlign: "center",
        backgroundColor: "orange",
        padding: 7,
        elevation: 5,
        marginVertical: 20,
    },
    mainView: {
        width: deviceWidth,
        borderWidth: 3,
        borderColor: "grey",
        padding: 10,
        flexDirection: "row",
    },
    textStyle: {
        fontSize: 15,
        color: "black",
        width: deviceWidth / 2,
    },
    addButton: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        borderRadius: 20,
        backgroundColor: "#f0ffff",
        padding: 7,
        height: 40,
        width: 50,
        textAlign: "center",
    },
    iconstyle: {
        height: 80,
        width: 80,
        marginVertical: 20

    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '30%'

    },

});
export default Home;
