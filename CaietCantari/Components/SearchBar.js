import React, { useState, useCallback, useMemo } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import CustomButton from "./CustomButton";
import { useAtom } from "jotai";
import { favoritesList, themeAtom } from "./State";
import { TouchableOpacity } from "react-native-gesture-handler";

const songItemHeight = 40;
const darkClearPNG = require("../assets/icons/dark-clear.png");
const lightClearPNG = require("../assets/icons/light-clear.png");

const SearchBar = (props) => {
  const [theme] = useAtom(themeAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [favoriteSongs] = useAtom(favoritesList);
  const songList = props.atom ? props.list.list : props.list;
  const clearPNG = theme == "dark" ? lightClearPNG : darkClearPNG;

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
        keyboardAvoidingView: {
          backgroundColor: bgColor,
          alignItems: "center",
          height: 50,
        },
        textInputContainer: {
          height: 50,
          flexDirection: "row",
          backgroundColor: bgColor,
          width: "99%",
          borderWidth: 1,
          borderColor: txtColor,
          borderRadius: 10,
        },
        textInput: {
          // height: 50,
          flex: 1,
          paddingLeft: 15,
          color: txtColor,
          fontSize: 17,
          backgroundColor: bgColor,
          borderColor: bgColor,
          borderRadius: 12,
        },
        touchable: {
          maxHeight: "100%",
          width: 50,
          backgroundColor: bgColor,
          borderRadius: 12,
        },
        image: {
          maxHeight: "100%",
          maxWidth: 50,
          backgroundColor: bgColor,
          borderRadius: 12,
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}
      >
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Cauta o cantare"
            placeholderTextColor={txtColor}
            value={searchQuery}
            onChangeText={onTextInputQueryChange}
            style={styles.textInput}
          />
          {searchQuery != "" && (
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => setSearchQuery("")}
            >
              <Image style={styles.image} source={clearPNG} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SearchBar;
