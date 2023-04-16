import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import SongList from "../Components/SongList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAtom } from "jotai";
import { themeAtom } from "../Components/State";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesList from "./FavoritesList";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import NavBar from "../Components/NavBar";
import Separator from "../Components/Separator";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [theme] = useAtom(themeAtom);
  const txtColor = theme == "light" ? "black" : "white";

  return (
    <DrawerContentScrollView {...props}>
      <Text
        style={{
          color: txtColor,
          fontSize: 25,
          fontWeight: "bold",
          margin: 10,
        }}
      >
        Meniu
      </Text>
      <Separator backgroundColor={txtColor} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const MainScreen = ({ navigation }) => {
  const [theme] = useAtom(themeAtom);
  const bgColor = theme == "dark" ? "black" : "white";
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: bgColor,
        },
      ]}
    >
      <View style={styles.listaCantari}>
        <SongList navigation={navigation} />
      </View>
    </View>
  );
};

const Home = () => {
  const [theme] = useAtom(themeAtom);
  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "light" ? "black" : "white";

  return (
    <Drawer.Navigator
      initialRouteName="Caiet de cantari"
      screenOptions={{
        drawerStyle: { backgroundColor: bgColor },
        drawerLabelStyle: { color: txtColor },
        drawerItemStyle: { backgroundColor: bgColor },
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="Caiet de cantari"
        component={MainScreen}
        options={{
          header: ({ navigation }) => (
            <NavBar mainScreen={true} navigation={navigation} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cantari favorite"
        component={FavoritesList}
        options={{
          header: ({ navigation }) => (
            <NavBar mainScreen={true} navigation={navigation} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listaCantari: {
    flex: 17,
    width: "100%",
  },
});

export default memo(Home);
