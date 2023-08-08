import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import notifee, { AndroidImportance } from '@notifee/react-native';

const ImageDownloadWithNotifee = () => {
    const [progress, setProgress] = useState(0);

    async function createNotificationChannel() {
        await notifee.createChannel({
            id: 'image_download_channel',
            name: 'Image Download Channel',
            description: 'Channel for image download notifications',
            importance: AndroidImportance.HIGH,
        });
    }

    const downloadImage = async () => {
        const url = 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg';
        const imagePath = `${RNFetchBlob.fs.dirs.DownloadDir}/image.jpg`;

        try {
            await createNotificationChannel();
            const response = await RNFetchBlob.config({
                fileCache: true,
                path: imagePath,
                addAndroidDownloads: {
                    // notification: {
                    //     title: 'Image Download',
                    //     description: 'Downloading image...',
                    //     actions: [{ title: 'Cancel', type: 'button', pressAction: 'cancel' }],
                    //     progress: { format: 'percentage' },
                    // },
                    useDownloadManager: true,
                    notification: true,
                    mediaScannable: true,
                    title: 'Image Download',
                    description: 'Downloading image...',
                    mime: 'image/jpeg',
                    path: imagePath,

                },
                indicator: true, // Enable progress tracking
                progress: (received, total) => {
                    const percentage = Math.floor((received / total) * 100);
                    setProgress(percentage);
                },
            }).fetch('GET', url);

            // When the download is complete, show a success notification
            await notifee.displayNotification({
                title: 'Image Download',
                body: 'Image Downloaded successfully.',
                android: {
                    channelId: 'image_download_channel',
                },
                
            });


        } catch (error) {
            console.error('Image download error:', error);
        }
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Button title="Download Image" onPress={downloadImage} />
            <Image
                source={{
                    uri: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
                }}
                style={{ width: 300, height: 200, marginTop: 20, alignSelf: 'center' }}
            />
            {/* <Text>{progress}% downloaded</Text> */}
        </View>
    );
};

export default ImageDownloadWithNotifee;
