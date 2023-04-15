require("react-devtools-core").connectToDevTools({ port: 19000 });
import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import SongDisplayScreen from "./Screens/SongDisplayScreen";
const Stack = createNativeStackNavigator();
import { Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeButtonKey } from "./Components/State";
import { themeAtom } from "./Components/State";
import { useAtom } from "jotai";

const App = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function getTheme() {
      const temp = await AsyncStorage.getItem(themeButtonKey);
      if (temp === null) {
        await AsyncStorage.setItem(themeButtonKey, "dark");
        setTheme("dark");
      } else {
        setTheme(temp);
      }
      setHasLoaded(true);
    }
    getTheme();
  }, []);

  return (
    <>
      {hasLoaded ? (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ header: () => <NavBar /> }}
            />
            <Stack.Screen
              name="SongDisplay"
              component={SongDisplayScreen}
              options={{ header: () => <NavBar /> }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <View style={{backgroundColor: "black"}}>
          <Image
            source={require("./assets/splash.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      )}
    </>
  );
};

export default App;
