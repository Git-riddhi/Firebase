import React, { useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacts from 'react-native-contacts';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export async function requestUserPermission() {
    console.log('permission');
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log('old FCM Token :', fcmToken)
    if (!fcmToken) {
        try {

            let fcmToken = await messaging().getToken()
            if (fcmToken) {
                console.log('new generated Fcm Token :', fcmToken);
            }
            await AsyncStorage.setItem('fcmToken', fcmToken)
        }
        catch (error) {
            console.log(error)
        }

    }

}



export const requestContactsPermission = async () => {
    const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.WRITE_CONTACTS : PERMISSIONS.IOS.CONTACTS;

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      console.log('Permission granted');
    } else {
      console.warn('Permission denied');
    }
  };

const saveContact = async (personName, contactNumber) => {
    try {
        await Contacts.addContact({
            givenName: personName,
            phoneNumbers: [
                {
                    label: 'mobile',
                    number: contactNumber,
                },
            ],
        });
        console.log('Contact saved successfully');
        Alert.alert('Contact saved successfully')

    } catch (err) {
        console.warn('Error saving contact', err);
    }
};


export const NotificationServices = () => {

    // const [loading, setLoading] = useState(false)

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    //Foreground message handling

    messaging().onMessage(async remoteMessage => {
        remoteMessage

        if (remoteMessage.notification.title && remoteMessage.notification.body) {
            const personName = remoteMessage.notification.title;
            console.log('personName ---->', personName);
            const contactNumber = remoteMessage.notification.body;
            console.log('contactNumber ---->', contactNumber);

            saveContact(personName, contactNumber);
        }
        console.log("remoteMessage.notification.title", remoteMessage.notification.title);
        // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });

    //check whether an initial notification is available

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                Alert.alert(
                    'Notification caused app to open from quit state:', remoteMessage
                );

            }

        });
}