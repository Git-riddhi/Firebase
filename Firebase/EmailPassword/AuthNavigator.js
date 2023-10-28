import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import ForgotPasswordScreen from './ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Login'} screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthNavigator;