import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Splash from "./Splash";
import SignUp from "./Signup";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const Navigators = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    headerMode: "screen",
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Navigators;
