import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';

const PhoneAuthentication = () => {
    const [phoneNumber, setPhoneNumber] = useState()

    const signInWithPhoneNumber = async (phoneNumber) => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            console.log("confirmation==", confirmation);
        } catch (error) {
            if (error.code == 'auth/invalid-phone-number') {
                console.log("Invalid Number");
            }
            else if (error.code == 'auth/too-many-requests') {
                console.log("many times requested");
            }
            console.log("error", error);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Enter Phone Number"
                keyboardType='numeric'
                onChangeText={(phoneNumber) => { setPhoneNumber(phoneNumber) }} />
            <View style={styles.button}>
                <Button title='Phone number verify' onPress={() => { signInWithPhoneNumber(`+91${phoneNumber}`) }} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center',
        width: 200,
        marginTop: 30,
    },
    input: {
        backgroundColor: 'silver',
        marginTop: 30,
        width: 200,
    },
})
export default PhoneAuthentication