import React, { useState, useEffect } from "react";
import { Button, TextInput, Text, View } from "react-native";
import auth from "@react-native-firebase/auth";


export default function PhoneVerification() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [number, setNumber] = useState("");

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // Handle create account button press
  async function createAccount() {
    try {
      await auth().createUserWithEmailAndPassword(
        "vivek.doe@example.com",
        "SecretPassword!"
      );
      console.log("User account created & signed in!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }
      console.error(error);
    }
  }

  // Handle the verify phone button press
  async function verifyPhoneNumber(phoneNumber) {
    const confirmation = await auth().verifyPhoneNumber(phoneNumber, true, true);
    setConfirm(confirmation);
    console.log("confirmation==>", confirmation);
  }

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code
      );
      console.log("credential==>", credential);
      console.log("Code=====>", code);
      let userData = await auth().currentUser.linkWithCredential(credential);
      setUser(userData.user);
    } catch (error) {
      if (error.code == "auth/invalid-verification-code") {
        console.log("Invalid code.");
      } else {
        console.log("Account linking error");
      }
    }
  }



  if (initializing) return null;

  if (!user) {
    return <Button title="Login" onPress={() => createAccount()} />;
  } else if (!user.phoneNumber) {
    if (!confirm) {
      return (
        <View>
          <TextInput
            value={number}
            onChangeText={(text) => setNumber(text)}
            style={{
              backgroundColor: "skyblue",
              width: "70%",
              alignSelf: "center",
              borderColor: "black",
              borderWidth: 1,
              marginVertical: 30,
            }}
          />
          <Button
            color={'green'}
            title="Verify Phone Number"
            onPress={() => verifyPhoneNumber(number)}
          />
        </View>
      );
    }
    return (
      <>
        <TextInput value={code} onChangeText={(text) => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
  } else {
    return (
      <Text>
        Welcome! {user.phoneNumber} linked with {user.email}
      </Text>
    );
  }
}
