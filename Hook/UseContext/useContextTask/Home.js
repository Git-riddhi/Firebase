import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Button, TextInput } from "react-native";
import BlogContext, { ClickableFunction } from "./DataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "./DataContext";

const HomeScreen = (props) => {
    const {
        email,
        password,
        setEmail,
        setPassword,
        firstName, setFirstName,
        lastName, setLastName,
        phoneNumber, setPhoneNumber,

    } = useContext(LoginContext);

    const LogOut = async () => {
        try {
            await AsyncStorage.removeItem('Loginkey')
            props.navigation.navigate("Login")
            setEmail('')
            setPassword('')

            console.log('Log out successfully');
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData()

    }, [])


    const getData = async () => {
        const getItem = await AsyncStorage.getItem('Loginkey')
        const showItem = JSON.parse(getItem)
        console.log("Homepage getItem ===>", showItem.email);

        if (email == '') {
            setEmail(showItem.email)
            console.log('showItem.email');
        }
        else {
            setEmail(email)
            console.log('email');
        }

        if (password == '') {
            setPassword(showItem.password)
        }
        else {
            setPassword(password)
        }

    };



    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Login Data</Text>

            {/* <Text style={styles.textStyle}>First Name :</Text>
            <Text style={styles.textStyle2}>{firstName}</Text>

            <Text style={styles.textStyle}>Last Name :</Text>
            <Text style={styles.textStyle2}> {lastName}</Text> */}

            <Text style={styles.textStyle}>Email :</Text>
            <Text style={styles.textStyle2}>{email}</Text>


            <Text style={styles.textStyle}>Password :</Text>
            <Text style={styles.textStyle2}>{password}</Text>

            {/* <Text style={styles.textStyle}>Phone Number :</Text>
            <Text style={styles.textStyle2}> {phoneNumber}</Text> */}



            <Button title="Log Out" color={'purple'} onPress={() => { LogOut() }} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        color: "purple",
        fontWeight: 'bold',
        marginBottom: 50
    },
    textStyle: {
        fontSize: 15,
        color: "purple",
    },
    textStyle: {
        fontSize: 17,
        color: "purple",
        fontWeight: 'bold',
    },
    textStyle2: {
        fontSize: 15,
        color: "purple",
        marginBottom: 25
    }

});

export default HomeScreen;