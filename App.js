import React from "react";
import StackNavigator from "./Hook/UseContext/useContextTask/StackNavigator";
import { LoginProvider } from "./Hook/UseContext/useContextTask/DataContext";

const App = () => {
  return (
  
    <LoginProvider>
      <StackNavigator />
    </LoginProvider>

  );
};

export default App;
