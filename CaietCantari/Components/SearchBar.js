import React, { useState, useCallback, useMemo } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import CustomButton from "./CustomButton";
import { useAtom } from "jotai";
import { favoritesList, themeAtom } from "./State";

const songItemHeight = 40;

const SearchBar = (props) => {
  const [theme] = useAtom(themeAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [favoriteSongs] = useAtom(favoritesList);
  const songList = props.atom ? props.list.list : props.list;

  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        filteredflatList: {
          backgroundColor: bgColor,
          flex: 99999,
          marginLeft: 10,
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
        songButton: {
          flex: 1,
          backgroundColor: bgColor,
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

  const renderSongItemForFilteredList = useCallback(
    ({ item, index }) => {
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
    },
    [theme]
  );

  const onTextInputQueryChange = (query) => {
    setSearchQuery(query);
    const editedQuery = query
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s.-_\/]/g, "");
    const filteredData = songList.filter((song) => {
      return (
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
    });
    setFilteredSongs(filteredData);
  };

  const renderFilteredList = () => {
    return (
      <View style={styles.filteredflatList}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={filteredSongs}
          renderItem={renderSongItemForFilteredList}
          keyExtractor={getKeyItem}
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={1}
          windowSize={Platform.OS == "ios" ? 2 : 1}
          extraData={searchQuery}
        />
      </View>
    );
  };

  return (
    <>
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
    </>
  );
};

export default SearchBar;
