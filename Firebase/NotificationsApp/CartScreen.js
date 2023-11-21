import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { CartData } from './CartData';
import AppContext from './AppContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useFocusEffect } from '@react-navigation/native';


const CartScreen = (props) => {

    const {
        favorites, setFavorites,
        increaseQuantity,
        decreaseQuantity,
        selectedItem,
        removeFromCart
    } = useContext(AppContext);

    console.log('selectedItem====>', selectedItem);

    const renderItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <View style={styles.innerContainer}>

                <View style={styles.wrapperImageCheck}>

                    <Image
                        source={{
                            uri: item.image
                        }}
                        style={styles.productImage}
                    />
                </View>

                <View style={{ justifyContent: 'space-between', width: '60%' }}>
                    <View>
                        <Text style={{ color: 'white' }}>{item.productName}</Text>
                        <Text style={{ color: 'white' }}>{item.price}</Text>
                    </View>

                    <View style={styles.wrapperCardBottom}>
                        <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(index)}>
                            <Text style={{ fontWeight: '600', color: 'white' }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ paddingHorizontal: 12, color: 'white' }}>{item.quantity}</Text>
                        <TouchableOpacity style={[styles.button, { borderColor: 'white' }]} onPress={() => increaseQuantity(index)}>
                            <Text style={styles.iconPlus}>+</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '10%' }}
                onPress={() => { removeFromCart(index) }}>
                <Icon name="delete" size={30} color={'white'} />
            </TouchableOpacity>
        </View>
    )

    return (
        <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.ImageBackground}
        >

            {selectedItem.length > 0 ?
                <View style={styles.container}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('AddToCart');
                            }}
                        >
                            <AntDesign name="arrowleft" size={30} color={"white"} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20 }}>My Cart</Text>
                        <View></View>
                    </View>

                    <FlatList
                        data={selectedItem}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item + index}
                        ItemSeparatorComponent={
                            <View style={styles.itemSeparatorComponentStyle} />
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                :

                <View style={styles.container}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('AddToCart');
                            }}
                        >
                            <AntDesign name="arrowleft" size={30} color={"white"} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 20 }}>My Cart</Text>
                        <View></View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 300 }}>

                        <Text style={styles.emptyText}>There is nothing in your cart.</Text>
                        <Text style={styles.emptyText}>Let's Add some Items.</Text>

                    </View>
                </View>
            }
        </ImageBackground>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    emptyText: {
        fontSize: 15,
        color: 'white',
        justifyContent: 'center',
    },
    ImageBackground: {
        flex: 1,
    },
    innerContainer: {
        flexDirection: 'row',
        margin: 10,
        width: '80%'
    },
    wrapperImageCheck: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 15,
    },
    button: {
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 4,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPlus: {
        color: 'white',
        fontWeight: '600',
    },
    wrapperCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        borderTopWidth: 0.5,
        paddingLeft: 15,
        borderColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textFooter: {
        fontSize: 16,
        fontWeight: '600',
    },
    buttonCheckout: {
        backgroundColor: 'orange',
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    button: {
        borderWidth: 0.5,
        borderRadius: 4,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    itemSeparatorComponentStyle: {
        height: 1,
        width: "100%",
        backgroundColor: "grey",
    },

})
export default CartScreen;