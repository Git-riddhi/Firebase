import React, { useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Contacts from 'react-native-contacts';
import messaging from '@react-native-firebase/messaging';
import { NotificationServices } from './Firebase/PushNotification';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function App() {

    useEffect(() => {
        // Initialize push notifications
        PushNotification.configure({
            onNotification: (notification) => {
                if (notification.title && notification.message) {
                    const personName = notification.title;
                    const contactNumber = notification.message;
                    saveContact(personName, contactNumber);
                }
            },
        });

        // Request contact permission at runtime
        requestContactsPermission();
    }, []);


    const requestContactsPermission = async () => {
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
        } catch (err) {
            console.warn('Error saving contact', err);
        }
    };

    const sendTestPushNotification = () => {
        // You can send a test FCM notification using the Firebase Console or a server.
        // For example, from the Firebase Console, send a data message with "title" and "body" fields.
        // The `onMessage` listener in this code will handle the FCM message and save the contact.
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 17, color: 'black' }}>Push Notification Contact Saver</Text>
            <Button title="Send Test Notification" onPress={sendTestPushNotification} />
        </View>
    );
}
