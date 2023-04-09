require("react-devtools-core").connectToDevTools({ port: 19000 });
import React from "react";
import NavBar from "./Components/NavBar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import SongDisplayScreen from "./Screens/SongDisplayScreen";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ header: () => <NavBar />, }}
          />
          <Stack.Screen
            name="SongDisplay"
            component={SongDisplayScreen}
            options={{ header: () => <NavBar /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
