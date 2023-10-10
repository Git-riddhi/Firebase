import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { CartData } from './CartData';
import AppContext from './AppContext';

const CartScreen = (props) => {

    const {
        cartItems, setCartItems,
        favorites, setFavorites,
        increaseQuantity,
        decreaseQuantity
    } = useContext(AppContext);


    const renderItem = ({ item, index }) => (

        <View style={styles.innerContainer}>

            <View style={styles.wrapperImageCheck}>
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.iconPlus}>V</Text>
                </TouchableOpacity> */}

                <Image
                    source={{
                        uri: item.image
                    }}
                    style={styles.productImage}
                />
            </View>

            <View style={{ justifyContent: 'space-between' }}>
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
    )

    return (
        <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.ImageBackground}
        >
            <View style={styles.container}>
                <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>My Cart</Text>

                <FlatList
                    data={CartData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={
                        <View style={styles.itemSeparatorComponentStyle} />
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ImageBackground>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    ImageBackground: {
        flex: 1,
    },
    innerContainer: {
        flexDirection: 'row',
        margin: 10,
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