import React, { useState, useMemo } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useAtom } from "jotai";
import { imageSize, themeAtom } from "./State";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomList from "./CustomList";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = (props) => {
  const [theme] = useAtom(themeAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const songList = props.atom ? props.list.list : props.list;

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
          borderRadius: 8,
        },
        textInput: {
          flex: 1,
          paddingLeft: 15,
          color: txtColor,
          fontSize: 17,
          backgroundColor: bgColor,
          borderColor: bgColor,
          borderRadius: 8,
        },
        touchable: {
          flex: 1,
          maxHeight: "100%",
          width: 50,
          backgroundColor: bgColor,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center"
        },
        image: {
          maxHeight: imageSize,
          maxWidth: imageSize,
          backgroundColor: bgColor,
        },
      }),
    [theme]
  );

  let editedQuery;
  let filteredData;

  const onTextInputQueryChange = (query) => {
    setSearchQuery(query);
    editedQuery = query
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s.-_\/]/g, "")
      .trim();
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
              <MaterialIcons name="clear" size={imageSize} color={txtColor} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SearchBar;
