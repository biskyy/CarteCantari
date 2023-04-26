import React, { useMemo } from "react";
import { useAtom } from "jotai";
import { favoritesList } from "../Components/State";
import { StyleSheet, View } from "react-native";
import { themeAtom } from "../Components/State";
import SearchBar from "../Components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomList from "../Components/CustomList";

const FavoritesList = (props) => {
  const [theme] = useAtom(themeAtom);
  const [favoriteSongs] = useAtom(favoritesList);
  const insets = useSafeAreaInsets();

  const bgColor = theme == "dark" ? "black" : "white";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: bgColor,
          flex: 1,
          paddingBottom: insets.bottom,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <CustomList data={favoriteSongs.list} navigation={props.navigation} />
      <SearchBar
        navigation={props.navigation}
        list={favoriteSongs}
        atom={true}
      />
    </View>
  );
};

export default FavoritesList;
