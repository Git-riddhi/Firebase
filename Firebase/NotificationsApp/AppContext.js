import React, { useMemo, useState } from "react";
import { CartData } from "./CartData";

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
    const [favorites, setFavorites] = useState([]);


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

    // const [isLogin, setIsLogin] = useState(false)


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
        cartItems, setCartItems,

        //Functions

        increaseQuantity,
        decreaseQuantity,
       


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
        cartItems, setCartItems,



          //Functions

          increaseQuantity,
          decreaseQuantity,

    ])

    return (
        <AppContext.Provider value={contextPayload}>{children}</AppContext.Provider>
    );
};

export default AppContext;