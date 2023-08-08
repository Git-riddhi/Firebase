import React from 'react';
import { Text, View } from 'react-native'
import ImageDownloadWithNotifee from './Firebase/PushNotification/LocalPushNotification/ImageDownloadWithNotifee';



const App = () => {
  return (

    <View style={{ flex: 1 }}>

      <ImageDownloadWithNotifee />

    </View>

  );
};

export default App;
