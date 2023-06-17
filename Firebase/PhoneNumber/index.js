import React, { useState, useEffect } from 'react';
import { Button, TextInput, Text, TouchableOpacity, Alert, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NotificationServices, requestUserPermission } from '../PushNotification';
import messaging from '@react-native-firebase/messaging';


const PhoneVerification = () => {

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');


  // Set an initializing state whilst Firebase connects

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // If null, no SMS has been sent

  // Handle user state changes

  const onAuthStateChanged = user => {
    console.log('user ====>', user);
    // if (user) {
    //   // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
    //   // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
    //   // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
    //   // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    // }
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM Token mssage arrived ==>', JSON.stringify(remoteMessage))
  //   })
  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   NotificationServices(),
  //     requestUserPermission()
  // }, [])

  // Handle the verify phone button press
  const verifyPhoneNumber = async (phoneNumber) => {
    console.log('verifyPhoneNumber function call');
    const confirmation = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    console.log('verifyPhoneNumber', phoneNumber);
  };


  // Handle confirm code button press
  const confirmCode = async () => {
    console.log('ConfirmCode function call.');
    try {
      console.log(' Code ====>', code)
      const res = await confirm.confirm(code);
      console.log(' response ====>', res)

      console.log('Valid code.');
    } catch (error) {
      console.log(error, "<====== error")

      console.log('Invalid code.');
    }
    // try {
    //     const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
    //     let userData = await auth().currentUser.linkWithCredential(credential);
    //     setUser(userData.user);
    // } catch (error) {
    //     if (error.code == 'auth/invalid-verification-code') {
    //         console.log('Invalid code.');
    //     } else {
    //         console.log('Account linking error');
    //     }
    // }
  };

  if (!confirm) {
    return (
      <View>
        {/* <TextInput
          value={number}
          placeholder='Enter PhoneNumber'
          onChangeText={number => setNumber(number)}
          style={{
            borderWidth: 0.5,
            marginHorizontal: 5,
            borderRadius: 10,
            padding: 10,
            width: '100%',
            height: 50,
            borderColor: 'grey',
            fontSize: 15,
          }}
          keyboardType="number-pad"
        /> */}

        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            padding: 15,
            alignSelf: 'center',
            borderWidth: 0.5,
            backgroundColor: 'green',
            marginTop: 40,
          }}
          onPress={() => verifyPhoneNumber('+918154909954')}>

          <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}> Sign In</Text>

        </TouchableOpacity>

      </View>

    );
  }

  console.log(code)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        style={{ borderWidth: 1, width: 200, marginBottom: 50 }}
        keyboardType="number-pad"
        maxLength={6}
      />

      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );

  //     if (initializing) return null;

  //     if (!user) {
  //         return <Button title="Login" onPress={() => createAccount()} />;
  //     } else if (!user.phoneNumber) {
  //         if (!confirm) {
  //             return (
  //                 <Button
  //                     title="Verify Phone Number"
  //                     onPress={() => verifyPhoneNumber('ENTER A VALID TESTING OR REAL PHONE NUMBER HERE')}
  //                 />
  //             );
  //         }
  //         return (
  //             <>
  //                 <TextInput value={code} onChangeText={text => setCode(text)} />
  //                 <Button title="Confirm Code" onPress={() => confirmCode()} />
  //             </>
  //         );
  //     } else {
  //         return (
  //             <Text>
  //                 Welcome! {user.phoneNumber} linked with {user.email}
  //             </Text>
  //         );
  //     }
};

export default PhoneVerification;
