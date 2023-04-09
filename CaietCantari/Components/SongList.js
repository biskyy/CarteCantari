import Cantari from "../Cantari.json";
import React, { useState, memo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Text
} from "react-native";
import CustomButton from "./CustomButton";

const songItemHeight = 40;

const SongList = memo((props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

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
    console.log(index)
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
      <View style={{ flex: 99999 }}>
        <FlatList
          data={filteredSongs}
          renderItem={renderSongItem}
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
        indicatorStyle="white"
        data={Cantari}
        renderItem={renderSongItem}
        keyExtractor={getKeyItem}
        style={styles.flatList}
        initialNumToRender={450}
        maxToRenderPerBatch={900}
        windowSize={450}
        getItemLayout={getItemLayout}
      />
      {searchQuery != "" && renderFilteredList()}
      <KeyboardAvoidingView
        style={{ backgroundColor: "black" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <TextInput
          placeholder="Cauta o cantare"
          placeholderTextColor="white"
          value={searchQuery}
          onChangeText={onTextInputQueryChange}
          style={styles.textInput}
        />
      </KeyboardAvoidingView>
    </View>
  );
});

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "black",
    flex: 1,
  },
  container: {
    backgroundColor: "black",
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
    fontSize: 17,
  },
  textInput: {
    height: 50,
    paddingLeft: 15,
    backgroundColor: "black",
    color: "white",
    width: "100%",
    fontSize: 17,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
});

export default SongList;
