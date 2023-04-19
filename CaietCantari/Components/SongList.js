import Cantari from "../Cantari.json";
import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useAtom } from "jotai";
import { themeAtom } from "./State";
import SearchBar from "./SearchBar";
import CustomList from "./CustomList";

const SongList = memo((props) => {
  const [theme] = useAtom(themeAtom);
  const data =
    props.book_id == ""
      ? Cantari
      : Cantari.filter((song, index) => {
          return song.book_id === props.book_id;
        });

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
      <CustomList data={data} navigation={props.navigation} />
      <SearchBar navigation={props.navigation} list={data} atom={false} />
    </View>
  );
});

export default SongList;
