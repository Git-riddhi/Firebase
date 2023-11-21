import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { styles } from './styles'
import messaging from '@react-native-firebase/messaging';
import { Badge } from 'react-native-paper';
// import { NotificationServices, getFcmToken, requestUserPermission } from '../../../utils/PushNotificationPermission';
// import PushNotification from 'react-native-push-notification';

const HandlingBadgeCount = (props) => {
    const [badgeCount, setBadgeCount] = useState(0);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            remoteMessage
            console.log("remoteMessage.notification.title", remoteMessage.notification.title);

            setBadgeCount(badgeCount + 1);
        });

        return unsubscribe;
    }, [badgeCount]);
    

    // useEffect(() => {
    //     requestUserPermission();
    //     getFcmToken();
    //     NotificationServices();
    // }, [])


    return (
        <View style={styles.mainViewstyle}>

            <Image source={require('../../../../../assets/chatSplash.png')} style={styles.imagestyle} />

            <TouchableOpacity

                onPress={() => {
                    setBadgeCount(0);
                    props.navigation.navigate('User')
                }}
            >
                <Image source={require('../../../../../assets/chatIcon.png')} style={styles.iconstyle} />
                <Badge
                    visible={badgeCount > 0}

                    size={25}
                    style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'green' }}
                >
                    {badgeCount}
                </Badge>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    mainViewstyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    imagestyle: {
        height: deviceHeight / 3,
        width: deviceWidth / 2,

    },
    iconstyle: {
        height: 80,
        width: 80,
    }
})

export default HandlingBadgeCount