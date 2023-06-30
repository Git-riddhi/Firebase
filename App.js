import React from "react";
import StackNavigator from "./Hook/UseContext/useContextTask/StackNavigator";
import { LoginProvider } from "./Hook/UseContext/useContextTask/DataContext";
import AuthNavigator from "./Firebase/EmailPassword/AuthNavigator";

const App = () => {
  return (
  
   <AuthNavigator/>

  );
};

export default App;
