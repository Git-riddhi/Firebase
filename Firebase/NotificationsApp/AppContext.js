import React, { useMemo, useState } from "react";
import { CartData } from "./CartData";
import { Alert } from "react-native";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkEmail, setCheckEmail] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [checkFirstName, setCheckFirstName] = useState('')
    const [checkLastName, setCheckLastName] = useState('')
    const [checkPhoneNumber, setCheckPhoneNumber] = useState('')


    const [cartItems, setCartItems] = useState(CartData);
    const [favorites, setFavorites] = useState(false);
    const [selectedItem, setSelectedItem] = useState([])
    const [selectedFavouriteItem, setSelectedFavouriteItem] = useState([])
    const [cartCount, setCartCount] = useState(0);
    const [favouriteCount, setFavouriteCount] = useState(0);



    const increaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
        }
    };

    const updateCartItems = (item) => {
        console.log("...selectedItem, item", ...selectedItem, item);
        setSelectedItem([...selectedItem, item])

    };

    const updateFavouriteItems =(item)=>{
        console.log("selected total favouriteItem ====>", ...selectedFavouriteItem, item);
        setSelectedFavouriteItem([...selectedFavouriteItem, item])
    }


    const removeFromCart = (index) => {
        Alert.alert("", `Do You want to remove the item from cart?`, [
            {
                text: "Yes",
                onPress: () => {
                    const array = [...selectedItem];
                    console.log("array :", array);
                    const deletedarray = array.splice(index, 1);
                    // console.log("deletearray :", deletedarray)
                    setSelectedItem(array);
                },
            },
            { text: "No", onPress: () => console.log("Okay"), style: "cancel" },
        ]);
    };


    const removeFromFavourites = (index) => {
        Alert.alert("", `Do You want to remove the item from favourites ?`, [
            {
                text: "Yes",
                onPress: () => {
                    const array = [...selectedFavouriteItem];
                    console.log("array :", array);
                    const deletedarray = array.splice(index, 1);
                    // console.log("deletearray :", deletedarray)
                    setSelectedFavouriteItem(array);
                },
            },
            { text: "No", onPress: () => console.log("Okay"), style: "cancel" },
        ]);
    };

    const contextPayload = useMemo(() => ({

        //states
        email, setEmail,
        password, setPassword,
        checkEmail, setCheckEmail,
        checkPassword, setCheckPassword,
        firstName, setFirstName,
        lastName, setLastName,
        phoneNumber, setPhoneNumber,
        checkFirstName, setCheckFirstName,
        checkLastName, setCheckLastName,
        checkPhoneNumber, setCheckPhoneNumber,
        favorites, setFavorites,
        cartItems, setCartItems,
        selectedItem, setSelectedItem,
        selectedFavouriteItem, setSelectedFavouriteItem,
        cartCount, setCartCount,
        favouriteCount, setFavouriteCount,

        //Functions

        increaseQuantity,
        decreaseQuantity,
        updateCartItems,
        removeFromCart,
        updateFavouriteItems,
        removeFromFavourites



    }), [

        //states
        email, setEmail,
        password, setPassword,
        checkEmail, setCheckEmail,
        checkPassword, setCheckPassword,
        firstName, setFirstName,
        lastName, setLastName,
        phoneNumber, setPhoneNumber,
        checkFirstName, setCheckFirstName,
        checkLastName, setCheckLastName,
        checkPhoneNumber, setCheckPhoneNumber,
        favorites, setFavorites,
        cartItems, setCartItems,
        selectedItem, setSelectedItem,
        selectedFavouriteItem, setSelectedFavouriteItem,
        cartCount, setCartCount,
        favouriteCount, setFavouriteCount,

        //Functions

        increaseQuantity,
        decreaseQuantity,
        updateCartItems,
        removeFromCart,
        updateFavouriteItems,
        removeFromFavourites

    ])

    return (
        <AppContext.Provider value={contextPayload}>{children}</AppContext.Provider>
    );
};

export default AppContext;