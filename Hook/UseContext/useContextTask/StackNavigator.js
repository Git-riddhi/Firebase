import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./Login";
import SplashScreen from "./Splash";
import HomeScreen from "./Home";
import RegistrationScreen from "./Registration";
import SignUp from "./Signup";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                // options={{ headerShown: true , headerTitle:'Home', headerBackVisible:false, headerTitleAlign:'center'}}
                />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={RegistrationScreen} />
                {/* <Stack.Screen name="Go" component={SignUp} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default StackNavigator;
