import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import SongList from "../Components/SongList";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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
    backgroundColor: "black",
  },
  listaCantari: {
    flex: 17,
    width: "100%",
  },
});

export default memo(HomeScreen);
