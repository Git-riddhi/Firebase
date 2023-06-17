import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NotificationServices, getFcmToken, requestUserPermission } from './Firebase/PushNotification';
import AuthNavigator from './Firebase/EmailPassword/AuthNavigator';
import PhoneVerification from './Firebase/PhoneNumber';

const App = () => {

    useEffect(() => {
        requestUserPermission();
        getFcmToken();
        NotificationServices();

    }, []);

    return (
        <View style={styles.container}>
            <Text>Hello</Text>

            {/* <PhoneVerification/> */}
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

export default App;