import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginContext from './DataContext';

const SplashScreen = (props) => {

    const {
        isLogin, setIsLogin
    } = useContext(LoginContext);

    // setTimeout(() => {
    //     props.navigation.navigate("Login")
    // }, 2000);


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const getItem = await AsyncStorage.getItem('Loginkey')
        // console.log("getItem", getItem);
        if (getItem === null) {
            // console.log("yes null");

            setTimeout(() => {
                props.navigation.navigate("Login")
            }, 1000);
        }
        else {
            setTimeout(() => {
                props.navigation.navigate("Home")
            }, 1000);
            console.log("splash get item ==else==>", getItem);

        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Splash</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
export default SplashScreen;