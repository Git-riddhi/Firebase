import React from 'react';
import { Text, View } from 'react-native';
import PhoneAuth from './Firebase/PhoneNumber/PhoneAuth';
import FacebookLogin from './Firebase/GoogleLogin/FacebookLogin';


const App = () => {
  return (

    <View style={{flex:1}}>
      <FacebookLogin />
    </View>

  );
};

export default App;
