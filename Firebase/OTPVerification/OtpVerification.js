import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
// import { NotificationServices, getFcmToken, requestUserPermission } from './Firebase/PushNotification';
// import AuthNavigator from './Firebase/EmailPassword/AuthNavigator';
// import PhoneVerification from './Firebase/PhoneNumber';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

const OtpVerification = () => {
    // const [text, setText] = useState();

    const [otp, setOtp] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // const otp1Ref = useRef();
    const otp2Ref = useRef();
    const otp3Ref = useRef();
    const otp4Ref = useRef();
    const otp5Ref = useRef();
    const otp6Ref = useRef();

    // const refs = useRef([]);


    // const [otp1, setOtp1] = useState('');
    // const [otp2, setOtp2] = useState('');
    // const [otp3, setOtp3] = useState('');
    // const [otp4, setOtp4] = useState('');
    // const [otp5, setOtp5] = useState('');
    // const [otp6, setOtp6] = useState('');

    const [isValidating, setIsValidating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Function to handle OTP validation

    const validateOtp = () => {
        setIsValidating(true);

        setTimeout(() => {
            setIsValidating(false);
            const otpVal = otp.toString().replaceAll(',', '');
            Alert.alert(
                'Validation',
                `OTP ${otpVal} is ${otp === '123456' ? 'valid' : 'invalid'}`,
            );
        }, 500);
    };



    // function for add value in state

    const addOtpValue = newValue => {
        console.log(newValue, '====> value');
        setOtp(prev => [...prev, newValue]);
    };

    useEffect(() => {
        // console.log(otp, 'otp value');
    }, [otp]);

    // Function to handle OTP submission

    // const submitOtp = () => {
    //     setIsSubmitting(true);
    //     const otpVal = otp.toString().replaceAll(',', '');
    //     setTimeout(() => {
    //         setIsSubmitting(false);
    //         Alert.alert('Submission', `OTP ${otpVal} submitted successfully`);
    //         console.log(
    //             'submitted successfully',
    //             `OTP ${otpVal} submitted successfully`,
    //         );
    //     }, 500);
    // };


    // Function to handle OTP submission
    const handleSubmit = () => {
        if (otp.length === 6) {
            const otpVal = otp.toString().replaceAll(',', '');
            console.log('otpValue===', otpVal);
            // Perform OTP validation
            if (otpVal === '123456') {
                // Valid OTP
                setOtp('')
                // Alert.alert('Success', 'OTP submitted successfully!');
                setSuccessMessage('OTP submitted successfully!')

            } else {
                // Invalid OTP
                setErrorMessage('Invalid OTP. Please try again.');
            }
        } else {
            setErrorMessage('Please enter a valid OTP.');
        }
    };



    // Function to handle OTP reset

    const resetOtp = () => {
        setOtp('');
        setErrorMessage('');
        setSuccessMessage('');

        //     setOtp2('');
        //     setOtp3('');
        //     setOtp4('');
        //     setOtp5('');
        //     setOtp6('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>OTP Verification</Text>

            {/* <View style={styles.textInputView}>
                <TextInput
                    value={otp1}
                    onChangeText={addOtpValue}
                    style={styles.textInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp2}
                    onChangeText={code => setOtp2(code)}
                    style={styles.textInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp3}
                    onChangeText={code => setOtp3(code)}
                    style={styles.textInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp4}
                    onChangeText={code => setOtp4(code)}
                    style={styles.textInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp5}
                    onChangeText={code => setOtp5(code)}
                    style={styles.textInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp6}
                    onChangeText={code => setOtp6(code)}
                    style={styles.textInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
            </View> */}

            <View style={styles.textInputView}>
                <TextInput
                    value={otp[0]}
                    onChangeText={otp => { addOtpValue(otp); if (otp !== null) { otp2Ref.current.focus() } }}
                    style={styles.textInput}
                    // style={[styles.textInput, otp ? {borderColor:'green',  borderWidth: 1,} : {borderColor:'grey'}]}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp[1]}
                    onChangeText={otp => { addOtpValue(otp); if (otp !== null) { otp3Ref.current.focus() } }}
                    style={styles.textInput}
                    // style={[styles.textInput, otp ? {borderColor:'green',  borderWidth: 1,} : {borderColor:'grey'}]}
                    keyboardType="number-pad"
                    ref={otp2Ref}
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp[2]}
                    onChangeText={otp => { addOtpValue(otp); if (otp !== null) { otp4Ref.current.focus() } }}
                    style={styles.textInput}
                    // style={[styles.textInput, otp ? {borderColor:'green',  borderWidth: 1,} : {borderColor:'grey'}]}
                    keyboardType="number-pad"
                    ref={otp3Ref}
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp[3]}
                    onChangeText={otp => { addOtpValue(otp); if (otp !== null) { otp5Ref.current.focus() } }}
                    style={styles.textInput}
                    // style={[styles.textInput, otp ? {borderColor:'green',  borderWidth: 1,} : {borderColor:'grey'}]}
                    keyboardType="number-pad"
                    ref={otp4Ref}
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp[4]}
                    onChangeText={otp => { addOtpValue(otp); if (otp !== null) { otp6Ref.current.focus() } }}
                    style={styles.textInput}
                    // style={[styles.textInput, otp ? {borderColor:'green',  borderWidth: 1,} : {borderColor:'grey'}]}
                    keyboardType="number-pad"
                    ref={otp5Ref}
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
                <TextInput
                    value={otp[5]}
                    onChangeText={otp => { addOtpValue(otp) }}
                    style={styles.textInput}
                    // style={[styles.textInput, otp ? {borderColor:'green',  borderWidth: 1,} : {borderColor:'grey'}]}
                    keyboardType="number-pad"
                    ref={otp6Ref}
                    maxLength={1}
                    textAlign="center"
                    editable={!isValidating && !isSubmitting}
                />
            </View>

            {errorMessage ? <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage}</Text> : null}

            <View style={styles.btnView}>

                <Button
                    title="Submit OTP"
                    color={'green'}
                    // color={isSubmitting ? 'green' : 'grey'}
                    onPress={handleSubmit}
                // disabled={isSubmitting || otp.length !== 6}
                />

                {/* <Button title="Validate OTP" onPress={validateOtp} color={'green'} /> */}

                <Button title="Reset OTP" onPress={resetOtp} color={'green'} />

            </View>

            {successMessage ? <Text style={{ color: 'green', marginTop: 20 }}>{successMessage}</Text> : null}

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 70,
    },
    heading: {
        fontSize: 30,
        color: 'green',
        fontWeight: 'bold',
        marginVertical: 60,
    },
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 0.5,
        marginHorizontal: 5,
        borderRadius: 10,
        padding: 10,
        width: 40,
        height: 50,
        borderColor: 'grey',
        fontSize: 20,
        backgroundColor: '#f5f4f2',
    },
    btnView: {
        flexDirection: 'row',
        gap: 10,
        margin: 30,
    },
});

export default OtpVerification;
