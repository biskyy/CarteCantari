import Cantari from "../Cantari.json";
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

const songItemHeight = 40;

const SongList = memo((props) => {
  const [theme, setTheme] = useAtom(themeAtom)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        filteredflatList: {
          backgroundColor: bgColor,
          flex: 99999,
        },
        flatList: {
          backgroundColor: bgColor,
          flex: 1,
        },
        container: {
          backgroundColor: bgColor,
          flex: 1,
        },
        songButton: {
          flex: 1,
          maxHeight: songItemHeight,
          minHeight: songItemHeight,
          marginLeft: 10,
          justifyContent: "center",
        },
        songButtonText: {
          color: txtColor,
          fontSize: 17,
        },
        textInput: {
          height: 50,
          paddingLeft: 15,
          backgroundColor: bgColor,
          color: txtColor,
          width: "99%",
          fontSize: 17,
          borderWidth: 1,
          borderColor: txtColor,
          borderRadius: 10,
        },
        keyboardAvoidingView: {
          backgroundColor: bgColor,
          alignItems: "center",
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

  const renderSongItem = useCallback(({ item, index }) => {
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
  }, [theme]);

  const renderSongItemForFilteredList = useCallback(({ item, index }) => {
    console.log("filtered list index:" + index);
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
  }, []);

  const onTextInputQueryChange = useCallback((query) => {
    setSearchQuery(query);
    const editedQuery = query
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s.-_\/]/g, "");
    const filteredData = Cantari.filter(
      (song) =>
        song.id.toString().includes(editedQuery) ||
        song.content
          .toLowerCase()
          .normalize("NFKD")
          .replace(/[^\w\s.-_\/]/g, "")
          .includes(editedQuery) ||
        song.title
          .toLowerCase()
          .normalize("NFKD")
          .replace(/[^\w\s.-_\/]/g, "")
          .includes(editedQuery)
    );
    setFilteredSongs(filteredData);
  }, []);

  const renderFilteredList = () => {
    return (
      <View style={styles.filteredflatList}>
        <FlatList
          data={filteredSongs}
          renderItem={renderSongItemForFilteredList}
          keyExtractor={getKeyItem}
          getItemLayout={getItemLayout}
          initialNumToRender={20}
          maxToRenderPerBatch={30}
          windowSize={200}
          extraData={searchQuery}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        indicatorStyle={txtColor}
        data={Cantari}
        renderItem={renderSongItem}
        keyExtractor={getKeyItem}
        style={styles.flatList}
        initialNumToRender={550}
        maxToRenderPerBatch={900}
        windowSize={450}
        getItemLayout={getItemLayout}
      />
      {searchQuery != "" && renderFilteredList()}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <TextInput
          placeholder="Cauta o cantare"
          placeholderTextColor={txtColor}
          value={searchQuery}
          onChangeText={onTextInputQueryChange}
          style={styles.textInput}
        />
      </KeyboardAvoidingView>
    </View>
  );
});

export default SongList;
