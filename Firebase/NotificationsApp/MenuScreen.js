import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';



const MenuScreen = (props) => {

    return (
        <View style={styles.container}>
            <Text>MenuScreen</Text>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center', justifyContent:'center'

    },
})
export default MenuScreen;