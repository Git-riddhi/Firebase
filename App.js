import React, { useEffect } from 'react';
import { Text, View } from 'react-native'
import Navigators from './Firebase/NotificationsApp/Navigators';
import { AppProvider } from './Firebase/NotificationsApp/AppContext';

const App = () => {

  return (
    <AppProvider>

      <View style={{ flex: 1 }}>

        <Navigators />

      </View>
    </AppProvider>

  );
};

export default App;
