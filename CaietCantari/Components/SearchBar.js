import React, { useState, useMemo } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useAtom } from "jotai";
import { themeAtom } from "./State";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomList from "./CustomList";

const darkClearPNG = require("../assets/icons/dark-clear-min.png");
const lightClearPNG = require("../assets/icons/light-clear-min.png");

const SearchBar = (props) => {
  const [theme] = useAtom(themeAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
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

  let editedQuery;
  let filteredData;

  const onTextInputQueryChange = (query) => {
    setSearchQuery(query);
    let editedQuery = query
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s.-_\/]/g, "")
      .trim()
    filteredData = songList.filter((song) => {
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
        <CustomList data={filteredSongs} navigation={props.navigation} />
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
