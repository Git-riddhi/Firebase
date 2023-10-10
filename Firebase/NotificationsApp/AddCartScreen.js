import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
} from "react-native";
import { CartData } from "./CartData";
import HeartOutlineIcon from 'react-native-vector-icons/Ionicons'
import { HeartIcon } from 'react-native-vector-icons/Ionicons';
import AppContext from "./AppContext";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const AddCartScreen = (props) => {
    const {
        cartItems, setCartItems,
        favorites, setFavorites,
        increaseQuantity,
        decreaseQuantity,
       
    } = useContext(AppContext);

    const renderItem = ({ item, index }) => (
        <View style={styles.innerContainer}>
            <View style={styles.wrapperImageCheck}>
                <Image
                    source={{
                        uri: item.image,
                    }}
                    style={styles.productImage}
                />
            </View>

            <Text style={styles.productNameStyle}>{item.productName}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Text style={styles.priceStyle}>{item.price}</Text>

                <TouchableOpacity onPress={() => {}}>
                        <HeartOutlineIcon name="heart-outline" color="#696" size={20} />
                   
                </TouchableOpacity>
                {/* <HeartOutlineIcon name="heart-outline" color="#696" size={20} onPress={() => { props.navigation.navigate('Favourites') }} /> */}

            </View>
            <View style={styles.wrapperCardBottom}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => decreaseQuantity(index)}
                >
                    <Text style={{ fontWeight: "600", color: "white" }}>-</Text>
                </TouchableOpacity>
                <Text style={{ paddingHorizontal: 12, color: "white" }}>
                    {item.quantity}
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => increaseQuantity(index)}
                >
                    <Text style={styles.iconPlus}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{
                    marginTop: 7,
                    backgroundColor: "#e9967a",
                    padding: 5,
                    borderRadius: 5,
                    marginBottom: 10,
                    height: 30,
                    width: 90,
                }}
                onPress={() => props.navigation.navigate('Cart', { cartItems: cartItems })}
            >
                <Text
                    style={{
                        fontSize: 13,
                        color: "black",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Add To Cart
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.ImageBackground}
        >
            <View style={styles.container}>
                <Text style={{ color: "white", fontSize: 20, marginBottom: 20 }}>
                    Shopping
                </Text>

                <FlatList
                    data={CartData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={<View style={{ width: 10, height: 10 }} />}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                />
            </View>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: 10,
    },
    ImageBackground: {
        flex: 1,
    },
    innerContainer: {
        borderWidth: 2,
        borderColor: "grey",
        margin: 5,
        padding: 10,
        alignItems: "center",
        borderRadius: 20,
        width: screenWidth / 3 - 20,
        height: screenHeight / 3.4,
    },
    wrapperImageCheck: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
    productImage: {
        width: 80,
        height: 80,
        // marginRight: 15,
    },
    button: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    iconPlus: {
        color: "white",
        fontWeight: "600",
    },
    wrapperCardBottom: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
    },
    productNameStyle: {
        color: "white",
        // marginBottom: 5,
        width: 90,
        height: 55
    },
    priceStyle: {
        color: "orange",
        width: 70,
        height: 25,
    },
});
export default AddCartScreen;
