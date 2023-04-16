import Cantari from "../Cantari.json";
import CantariBER from "../CantariBER.json"
import React, { useState, memo, useCallback, useMemo, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import CustomButton from "./CustomButton";
import { useAtom } from "jotai";
import { themeAtom } from "./State";
import SearchBar from "./SearchBar";

const songItemHeight = 40;

const SongList = memo((props) => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const Cantari2 = Cantari.concat(CantariBER)

  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        flatList: {
          backgroundColor: bgColor,
          flex: 1,
          marginLeft: 10,
        },
        container: {
          backgroundColor: bgColor,
          flex: 1,
        },
        songButton: {
          flex: 1,
          maxHeight: songItemHeight,
          minHeight: songItemHeight,
          justifyContent: "center",
        },
        songButtonText: {
          color: txtColor,
          fontSize: 17,
        },
      }),
    [theme]
  );

  const getKeyItem = useCallback((item, index) => index, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: songItemHeight,
      offset: songItemHeight * index,
      index,
    }),
    []
  );

  const renderSongItem = useCallback(
    ({ item, index }) => {
      console.log(index);
      return (
        <CustomButton
          style={styles.songButton}
          textStyle={styles.songButtonText}
          onPress={() => {
            props.navigation.navigate("SongDisplay", { song: item });
          }}
          text={item.title}
        />
      );
    },
    [theme]
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        indicatorStyle={txtColor}
        data={Cantari2}
        renderItem={renderSongItem}
        keyExtractor={getKeyItem}
        style={styles.flatList}
        maxToRenderPerBatch={1}
        windowSize={Platform.OS == "ios" ? 2 : 1}
        getItemLayout={getItemLayout}
      />
      <SearchBar navigation={props.navigation} list={Cantari2} atom={false} />
    </View>
  );
});

export default SongList;
