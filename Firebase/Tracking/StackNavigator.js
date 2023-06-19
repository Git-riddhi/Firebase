import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import FlashMessage from 'react-native-flash-message';

//Screens
import ChooseLocation from './Firebase/Tracking/ChooseLocation';
import Home from './Firebase/Tracking/Home';



const StackNavigatorScreen = () => {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="R-Map" component={Home} />
                <Stack.Screen name="Choose Location" component={ChooseLocation} />
            </Stack.Navigator>
            {/* <FlashMessage
                position="top"
            /> */}
        </NavigationContainer>
    );
};

export default StackNavigatorScreen;