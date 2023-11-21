import React from "react";
import AuthNavigator from "./Firebase/EmailPassword/AuthNavigator";

const App = () => {
  return (
  
    <LoginProvider>
      <StackNavigator />
    </LoginProvider>

  );
};

export default App;