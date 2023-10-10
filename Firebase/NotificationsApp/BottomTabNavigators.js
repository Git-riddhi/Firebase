import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Favourites from './Favourites';
import MenuScreen from './MenuScreen';
import CartScreen from './CartScreen';
import { NavigationContainer } from '@react-navigation/native';
import HeartIcon from 'react-native-vector-icons/Ionicons'
import HeartOutlineIcon from 'react-native-vector-icons/Ionicons'
import HomeIcon from 'react-native-vector-icons/Ionicons'
import HomeOutlineIcon from 'react-native-vector-icons/Ionicons'
import CartIcon from 'react-native-vector-icons/Ionicons'
import CartOutlineIcon from 'react-native-vector-icons/Ionicons'
import MenuIcon from 'react-native-vector-icons/Ionicons'
import MenuOutlineIcon from 'react-native-vector-icons/Ionicons'

import { Text } from 'react-native';




const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
    
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarActiveTintColor: '#1e90ff',
                    tabBarInactiveTintColor: '#696969',
                    tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' }

                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Home',
                        // tabBarLabel: (focused) => <Text style={{ fontSize: 15, color: focused ? 'black' : "black" }}> Home </Text>,
                        tabBarIcon: ({ focused, color, size }) => (
                            focused ?
                                <HomeIcon name="home" color={'#1e90ff'} size={30} />
                                :
                                <HomeOutlineIcon name="home-outline" color={'#696969'} size={30} />

                        ),
                    }}
                />
                <Tab.Screen
                    name="Favourites"
                    component={Favourites}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Favourites',
                        tabBarIcon: ({ focused, color, size }) => (
                            focused ?
                                <HeartIcon name="heart" color={'#1e90ff'} size={30} />
                                :
                                <HeartOutlineIcon name="heart-outline" color={'#696969'} size={30} />

                        ),
                    }}
                />
                <Tab.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{

                        headerShown: false,
                        tabBarLabel: 'Cart',
                        tabBarIcon: ({ focused, color, size }) => (
                            focused ?
                                <CartIcon name="cart" color={'#1e90ff'} size={30} />
                                :
                                <CartOutlineIcon name="cart-outline" color={'#696969'} size={30} />

                        ),
                    }}
                />
                <Tab.Screen
                    name="Menu"
                    component={MenuScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Menu',
                        tabBarIcon: ({ focused, color, size }) => (
                            focused ?
                                <MenuIcon name="menu" color={'#1e90ff'} size={30} />
                                :
                                <MenuOutlineIcon name="menu-outline" color={'#696969'} size={30} />
                        ),
                    }}
                />
            </Tab.Navigator>
      
    );
};

export default BottomTabNavigator;
