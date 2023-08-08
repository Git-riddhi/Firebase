/**
 * @format
 */

import { AppRegistry, Alert } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  Alert.alert('Message handled in the background!', remoteMessage);
});


// Create the notification channel
async function createNotificationChannel() {
  const channelId = 'downloads';
  await notifee.createChannel({
    id: channelId,
    name: 'Downloads',
    importance: AndroidImportance.DEFAULT,
  });
}

createNotificationChannel();

AppRegistry.registerComponent(appName, () => App);
