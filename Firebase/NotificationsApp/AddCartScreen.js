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
import CartOutlineIcon from 'react-native-vector-icons/Ionicons'
import AntDesign from "react-native-vector-icons/AntDesign";
import { Badge } from "react-native-paper";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const AddCartScreen = (props) => {
    const {
        cartItems, setCartItems,
        favorites, setFavorites,
        increaseQuantity,
        decreaseQuantity,
        updateCartItems,
        updateFavouriteItems,
        cartCount, setCartCount,
        favouriteCount, setFavouriteCount,
        selectedFavouriteItem,
        setSelectedFavouriteItem
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

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                <Text style={styles.priceStyle}>{item.price}</Text>


                {/* <TouchableOpacity
                    onPress={() => {
                        // Toggle selection and change heart icon color
                        setSelectedFavouriteItem(item.productName === selectedFavouriteItem ? null : item.productName);
                    }}
                >
                    <HeartOutlineIcon
                        name={"heart-outline"}
                        color={item.productName === selectedFavouriteItem ? "red" : "white"}
                        size={20}
                    />
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                    onPress={() => {
                        if (selectedItem === null) {
                            setSelectedItem(item);
                            updateFavouriteItems(item);
                            setFavorites(true);
                        } else if (selectedItem === item) {
                            setSelectedItem(null);
                            updateFavouriteItems(item);
                            setFavorites(false);
                        }
                        setFavouriteCount(favouriteCount + (selectedItem ? -1 : 1));
                    }}
                >
                    <HeartOutlineIcon name={selectedItem === item ? "heart" : "heart-outline"} color={selectedItem === item ? "red" : "white"} size={20} />
                </TouchableOpacity> */}


                <TouchableOpacity onPress={() => {
                    updateFavouriteItems(item);
                    console.log('favourite item =====>', item);
                    setFavorites(!favorites)
                    setFavouriteCount(favouriteCount + 1);

                }}>
                    <HeartOutlineIcon name={"heart-outline"} color={"white"} size={20} />
                </TouchableOpacity>

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

                // onPress={() => props.navigation.navigate('Cart', { cartItems: cartItems })}
                onPress={() => {
                    updateCartItems(item);
                    console.log(' selected item----', item);
                    setCartCount(cartCount + 1);
                    // props.navigation.navigate('Cart', { cartItems: item });
                }}
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Home');
                        }}
                    >
                        <AntDesign name="arrowleft" size={30} color={"white"} />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontSize: 20 }}>
                        Shopping
                    </Text>

                    <View style={{ alignItems: 'center', flexDirection: 'row', width: '30%', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity onPress={() => {
                            setFavouriteCount(0)
                            props.navigation.navigate('Favourites')
                        }}>

                            <HeartOutlineIcon name="heart-outline" color="white" size={25} />


                            <Badge
                                visible={favouriteCount > 0}
                                size={20}
                                style={{ position: 'absolute', bottom: 17, right: -10, backgroundColor: 'green' }}
                            >
                                {favouriteCount}
                            </Badge>
                        </TouchableOpacity>

                        <CartOutlineIcon name="cart-outline" color={'white'} size={30} onPress={() => {
                            setCartCount(0)
                            props.navigation.navigate('Cart')
                        }} />

                        <Badge
                            visible={cartCount > 0}
                            size={20}
                            style={{ position: 'absolute', bottom: 17, right: 8, backgroundColor: 'green' }}
                        >
                            {cartCount}
                        </Badge>

                    </View>

                </View>

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
        marginHorizontal: 17,
        marginTop: 15,
    },
    ImageBackground: {
        flex: 1,
    },
    innerContainer: {
        // borderWidth: 2,
        // borderColor: "grey",
        margin: 5,
        padding: 10,
        alignItems: "center",
        // borderRadius: 20,
        width: screenWidth / 3 - 20,
        height: screenHeight / 3.5,
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
        // height: 25,
    },
    // badge: {
    //     position: 'absolute',
    //     top: 0,
    //     right: -8,
    //     backgroundColor: 'green',
    //     borderRadius: 10,
    //     width: 20,
    //     height: 20,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
});
export default AddCartScreen;
