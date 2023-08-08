import React, { useEffect } from 'react';
import { View, Button, Image } from 'react-native';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import RNFetchBlob from 'rn-fetch-blob';

const ImageDownloadedNotification = () => {

  useEffect(() => {
    // When the component mounts, download the image and show the notification
    downloadImage().then((imagePath) => {
      if (imagePath) {
        showNotification(imagePath);
      }
    });
  }, []);

  const downloadImage = async () => {
    try {
      const imageURI = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'; // Replace with the actual image URL

      const response = await RNFetchBlob.config({
        path:`${RNFetchBlob.fs.dirs.DownloadDir}/image.jpg`,
      }).fetch('GET', imageURI);

      const imagePath = response.path();
      return imagePath;
    } catch (error) {
      console.error('Error downloading image:', error);
      return null;
    }
  };


  const showNotification = async (imagePath) => {
    try {
      await notifee.createChannel({
        id: 'image_download_channel',
        name: 'Image Download Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: 'Image Downloaded',
        body: 'The image has been downloaded successfully!',
        android: {
          channelId: 'image_download_channel',
          smallIcon: 'ic_launcher', // Replace with the name of your app's small icon
          largeIcon: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
          picture: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
          autoCancel: true,
          importance: AndroidImportance.HIGH,

        },
        
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="ImageDownload" onPress={() => { showNotification() }} />
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
        }}
        style={{ width: 200, height: 300, marginTop: 20, alignSelf: 'center' }}
      />
    </View>
  );
}

export default ImageDownloadedNotification