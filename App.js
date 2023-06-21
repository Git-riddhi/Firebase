// App.js
import React from "react";
import StackNavigatorScreen from "./Firebase/Tracking/StackNavigator";
import { BlogProvider } from "./Hook/UseContext/DataContext";
import IndexScreen from "./Hook/UseContext";

const App = () => {
  return (
    <BlogProvider>
      <IndexScreen />
    </BlogProvider>
  );
};

export default App;
