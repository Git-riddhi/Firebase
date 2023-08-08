import React from 'react';
import { View, Button } from 'react-native';
import notifee, { AndroidStyle } from '@notifee/react-native';

const LocalPushnotification = () => {

    const onDisplayNotification = async () => {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId,
                // style: { type: AndroidStyle.BIGTEXT, text: 'Hello my name is Riddhi. I am working on react native. In react native, I am working on frebase push notification.' },
                style: { type: AndroidStyle.BIGPICTURE, picture: 'https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?w=740&t=st=1690971410~exp=1690972010~hmac=deae7d72328eb6498364b8aac05b3727c247b398a50acfed2a81017bc5ca3a33' },
                // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });


    }

    // const onUploadTaskEvent=async (event, upload) => {
    //     if (event.status === 'start') {
    //       await notifee.displayNotification({
    //         id: upload.id,
    //         android: {
    //           progress: {
    //             max: upload.size,
    //             current: 0,
    //           },
    //         },
    //       });
    //     }
      
    //     if (event.status === 'update') {
    //       await notifee.displayNotification({
    //         id: upload.id,
    //         android: {
    //           progress: {
    //             max: upload.size,
    //             current: upload.current,
    //           },
    //         },
    //       });
    //     }
      
    //     if (upload.size === upload.current) {
    //       await notifee.displayNotification({
    //         id: upload.id,
    //         title: 'Finalizing upload...',
    //         android: {
    //           progress: {
    //             indeterminate: true,
    //           },
    //         },
    //       });
    //     }
      
    //     if (event.status === 'complete') {
    //       await notifee.cancelNotification(upload.id);
    //     }
    //   };

    //   notifee.displayNotification({
    //     title: 'Updating',
    //     android: {
    //       onlyAlertOnce: true,
    //     },
    //   });


    // For Image upload :
    // notifee.displayNotification({
    //     title: 'Image uploaded',
    //     body: 'Your image has been successfully uploaded',
    //     android: {
    //       channelId,
    //       style: { type: AndroidStyle.BIGPICTURE, picture: 'https://my-cdn.com/user/123/upload/456.png' },
    //     },
    //   });


    // For long text :
    // style: { type: AndroidStyle.BIGTEXT, text: 'Large volume of text shown in the expanded state' },

    // For Inbox style notifications :
    // style: {
    //     type: AndroidStyle.INBOX,
    //     lines: ['First Message', 'Second Message', 'Third Message', 'Forth Message'],
    //   },

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Display Notification" onPress={() => { onDisplayNotification() }} />
        </View>
    );
}

export default LocalPushnotification