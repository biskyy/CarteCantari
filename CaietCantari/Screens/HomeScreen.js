import React, { memo, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SongList from "../Components/SongList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAtom } from "jotai";
import { themeAtom } from "../Components/State";

const HomeScreen = ({ navigation }) => {
  const [theme] = useAtom(themeAtom)
  const insets = useSafeAreaInsets();
  const bgColor = theme == "dark" ? "black" : "white"

  return (
    <>
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
    </>
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

export default memo(HomeScreen);
