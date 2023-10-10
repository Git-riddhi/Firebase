import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import AppContext from './AppContext';



const Favourites = (props) => {

    const { favorites } = useContext(AppContext);
    // const { favorites } = props.route.params;

    // const favoriteItems = favorites.map(index => CartData[index]);
    // console.log('favoriteItems ====>', favoriteItems);

    return (
        <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="cover"
            style={styles.ImageBackground}
        >
            <View style={styles.container}>

                <Text>Favorites:</Text>
                {favorites && favorites.map((item, index) => (
                    <View key={index}>
                        {/* Display your favorite item data here */}
                        <Text>{item.productName}</Text>
                    </View>
                ))}
            </View>
        </ImageBackground>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    ImageBackground: {
        flex: 1,
    },
})
export default Favourites;