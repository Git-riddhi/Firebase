import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';

const App = () => {


    const handleSignUp = async (email, password) => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            console.log('User account created & signed in!', userCredential.user);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSignIn = async (email, password) => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            console.log('User signed in!', userCredential.user);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSignOut = async () => {
        try {
            await auth().signOut();
            console.log('User signed out!');
        } catch (error) {
            console.error(error);
        }
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Sign Up" onPress={() => handleSignUp(email, password)} />
            <Button title="Sign In" onPress={() => handleSignIn(email, password)} />
            <Button title="Sign Out" onPress={() => handleSignOut()} />
        </View>
    );
}

export default App;