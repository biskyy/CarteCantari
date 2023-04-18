import Cantari from "../Cantari.json";
import CantariBER from "../CantariBER.json";
import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useAtom } from "jotai";
import { themeAtom } from "./State";
import SearchBar from "./SearchBar";
import CustomList from "./CustomList";

const SongList = memo((props) => {
  const [theme] = useAtom(themeAtom);
  const Cantari2 = Cantari.concat(CantariBER);

  const bgColor = theme == "dark" ? "black" : "white";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: bgColor,
          flex: 1,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <CustomList data={Cantari2} navigation={props.navigation} />
      <SearchBar navigation={props.navigation} list={Cantari2} atom={false} />
    </View>
  );
});

export default SongList;
