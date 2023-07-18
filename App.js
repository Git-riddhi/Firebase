import React from 'react';
import { Text, View } from 'react-native';
import PhoneAuth from './Firebase/PhoneNumber/PhoneAuth';
import FacebookLogin from './Firebase/GoogleLogin/FacebookLogin';
import PhoneAuthentication from './Firebase/PhoneNumber/PhoneAuth';
import FacebookSignin from './Firebase/GoogleLogin/FacebookSignin';


const App = () => {
  return (

    <View style={{flex:1}}>
      <FacebookLogin />
    </View>

  );
};

export default App;
