import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Contacts from 'react-native-contacts';
import messaging from '@react-native-firebase/messaging';
import { NotificationServices, requestContactsPermission } from './NotificationServicesForContact';


export default function SaveContact() {

  // Background message handling
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    remoteMessage

    console.log('remoteMessage=====>', remoteMessage)

    // Handle background message here
    if (remoteMessage.notification.title && remoteMessage.notification.body) {
      const personName = remoteMessage.notification.title;
      const contactNumber = remoteMessage.notification.body;
      saveContact(personName, contactNumber);
    }
  });

  useEffect(() => {
    // Initialize push notifications

    PushNotification.configure({
      onNotification: function (notification) {
        console.log('notification====>', notification);
        // Handle the silent notification here without displaying a visible notification
        if (notification.userInteraction === false) {
          console.log('notification2222====>', notification);
          // Process the data silently
          if (notification.data && notification.data.title && notification.data.body) {
            const personName = notification.data.title;
            const contactNumber = notification.data.body;
            saveContact(personName, contactNumber);
          }
        }
      },
      // Other configuration options
    });

  }, []);

  useEffect(() => {
    // Request contact permission at runtime
    requestContactsPermission();
    NotificationServices()
  }, []);



  // const requestContactsPermission = async () => {
  //   const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.WRITE_CONTACTS : PERMISSIONS.IOS.CONTACTS;

  //   const result = await request(permission);
  //   if (result === RESULTS.GRANTED) {
  //     console.log('Permission granted');
  //   } else {
  //     console.warn('Permission denied');
  //   }
  // };

  // Initialize Firebase Cloud Messaging
  messaging()
    .getToken()
    .then((token) => {
      console.log('FCM Token:', token);
    });


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
