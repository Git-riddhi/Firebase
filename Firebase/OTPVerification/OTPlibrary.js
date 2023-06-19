import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OTPUsingLibrary = () => {
    // const [otp, setOTP] = useState('');

    // const handleOTPChange = (newOTP) => {
    //     setOTP(newOTP);
    // };

    // const handleOTPSubmit = () => {
    //     // Perform OTP validation here
    //     if (otp === '1234') {
    //         // OTP is valid
    //         console.log('OTP is valid');
    //     } else {
    //         // OTP is invalid
    //         console.log('OTP is invalid');
    //     }
    // };


    return (
        <View style={styles.container}>

            <Text style={styles.heading}>OTP Verification</Text>

            <Text style={{ fontSize: 18, marginBottom: 20 }}>Enter OTP</Text>

            <View>
                {/* <OTPInputView
            
                    style={{ width: '80%', height: 200 }}
                    pinCount={4}
                    // autoFocusOnLoad
                    // codeInputFieldStyle={{ width: 50, height: 50 }}
                    // onCodeChanged={handleOTPChange}
                    // codeInputHighlightStyle={{ borderColor: 'red' }}
                /> */}

            </View>

            <View style={styles.btnView}>
                <Button
                    title="Submit"
                    color={'green'}
                    // onPress={handleOTPSubmit}
                // disabled={otp.length !== 6}
                />
            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 80,
    },
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        width: 40,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: 5,
        borderColor: 'grey',
        fontSize: 20,
        padding: 10,
        backgroundColor: '#f5f4f2',
    },

    btnView: {
        flexDirection: 'row',
        gap: 10,
        margin: 30,
    },
});

export default OTPUsingLibrary;

