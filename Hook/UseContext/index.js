import React, { useContext } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import BlogContext, { ClickableFunction } from "./DataContext";

const IndexScreen = () => {
    const blogPosts = useContext(BlogContext);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Index Screen</Text>
            <FlatList
                data={blogPosts}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return <Text style={styles.textStyle}>{item.title}</Text>;
                }}
            />
            <Button title="Click" color={'green'} onPress={()=>{ClickableFunction()}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30

    },
    textStyle: {
        backgroundColor: "lightgrey",
        padding: 10,
        fontSize: 20,
        color: "black"
    },
    heading: {
        fontSize: 20,
        color: "black",
        marginBottom: 20
    },
});

export default IndexScreen;
