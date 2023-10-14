import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';


const Splash = (props) => {

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const getItem = await AsyncStorage.getItem('Loginkey')
        // console.log("splash get item login key  ==else==>", getItem);

        if (getItem === null) {
            console.log("yes null");
            setTimeout(() => {
                props.navigation.navigate("Login")
            }, 1000);
        }
        else {
            setTimeout(() => {
                props.navigation.replace('BottomTab')
            }, 1000);
        }
    };

    return (
        // <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/splash.png")}
                resizeMode="cover"
                style={styles.image}
            ></ImageBackground>
        // </View>

    );
}
const styles = StyleSheet.create({
    image: {
        flex:1,

    },
})
export default Splash;