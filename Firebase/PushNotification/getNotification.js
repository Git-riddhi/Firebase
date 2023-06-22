import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NotificationServices, getFcmToken, requestUserPermission } from '../PushNotification/index';


const GetNotification = () => {

    useEffect(() => {
        requestUserPermission();
        getFcmToken();
        NotificationServices()

    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Push Notification</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700'
    }
});

export default GetNotification;