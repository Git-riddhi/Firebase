import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Button,
    StyleSheet,
} from 'react-native';

const OTPVerificationScreen = () => {
    const [otp, setOTP] = useState('');
    const [reset, setReset] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const refs = useRef([]);

    const handleInputChange = (index, value) => {
        if (value.length <= 1) {
            const updatedOTP = otp.split('');
            updatedOTP[index] = value;
            setOTP(updatedOTP.join(''));

            if (value.length === 1 && index < 5) {
                refs.current[index + 1].focus();
            }
        }
    };

    const handleReset = () => {
        setOTP('');
        setReset(true);
        setErrorMessage('')
        setSuccessMessage('')
        refs.current[0].focus();
    };

    const handleSubmit = () => {
        if (otp.length === 6) {
            const otpVal = otp.toString().replaceAll(',', '');
            console.log('otpValue===', otpVal);

            if (otpVal === '123456') {
                setOTP('');
                // Alert.alert('Success', 'OTP submitted successfully!');
                setSuccessMessage('OTP submitted successfully!');
            } else {
                setErrorMessage('Invalid OTP. Please try again.');
            }
        } else {
            setErrorMessage('Please enter a valid OTP.');
        }
    };

    const handleInputFocus = index => {
        if (reset) {
            setReset(false);
            if (index === 5) {
                refs.current[index].blur();
            }
        }
    };

    const handleBackspacePress = (index) => {
        // Clear the value in the current text input
        refs.current[index].setNativeProps({ text: '' });
      
        // Move the focus to the previous input, if available
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
          refs.current[prevIndex].focus();
          // setOTP(prevIndex.toString());
        }
      };

    return (
        <View style={styles.container}>

            <Text style={styles.heading}>OTP Verification</Text>


            <Text style={{ fontSize: 18, marginBottom: 20 }}>Enter OTP</Text>

            <View style={styles.textInputView}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <TextInput
                        key={index}
                        ref={ref => (refs.current[index] = ref)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace') {
                                handleBackspacePress(index);
                            }
                        }}
                        style={styles.textInput}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={value => handleInputChange(index, value)}
                        value={otp[index]}
                        autoFocus={index === 0}
                        onFocus={() => handleInputFocus(index)}
                    />
                ))}
            </View>

            {errorMessage ? (
                <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage}</Text>
            ) : null}

            <View style={styles.btnView}>
                <Button
                    title="Reset"
                    // color={'blue'}
                    onPress={handleReset}
                />
                <Button
                    title="Submit"
                    color={'green'}
                    onPress={handleSubmit}
                // disabled={otp.length !== 6}
                />
            </View>

            {successMessage ? (
                <Text style={{ color: 'green', marginTop: 70 }}>{successMessage}</Text>
            ) : null}

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

export default OTPVerificationScreen

