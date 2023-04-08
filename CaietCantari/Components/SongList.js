import Cantari from "../Cantari.json";
import React, { useState, memo, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import CustomButton from "./CustomButton";
import NavBar from "./NavBar";
import Separator from "./Separator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const zoomInPNG = require("../assets/icons/zoom-in.png");
const zoomOutPNG = require("../assets/icons/zoom-out.png");
const undoPNG = require("../assets/icons/undo.png");

const songItemHeight = 40;
const textSizeKey = "textSizeKey";

const SongList = memo(() => {
  const [selectedSong, setSelectedSong] = useState([false, Cantari[0]]);
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState(Cantari);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [textSize, setTextSize] = useState(20);

  const zoomHandler = async (sign) => {
    if (sign === "+") setTextSize(textSize + 2);
    if (sign === "-") if (textSize > 2) setTextSize(textSize - 2);
    try {
      await AsyncStorage.setItem(textSizeKey, textSize.toString());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getFontSize() {
      try {
        const value = await AsyncStorage.getItem(textSizeKey);
        if (value !== null) setTextSize(parseInt(value));
      } catch (err) {
        console.error(err);
      }
    }
    getFontSize();
  }, []);

  const backEvent = () => setSelectedSong([false, Cantari[0]]);

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
        textContainerStyle={styles.songButtonTextContainer}
        textStyle={styles.songButtonText}
        onPress={() => setSelectedSong([true, item])}
        text={item.title}
      />
    );
  }, []);

  const renderSongContent = () => {
    return (
      <Modal
        animationType="none"
        visible={selectedSong[0]}
        onRequestClose={backEvent}
        transparent={false}
        style={{ backgroundColor: "black" }}
      >
        <NavBar />
        <View style={styles.songContainer}>
          <View style={styles.songTitleContainer}>
            <Text
              style={[
                styles.text,
                styles.titleText,
                { fontSize: textSize, flexShrink: 0 },
              ]}
              numberOfLines={1}
            >
              {selectedSong[1].title}
            </Text>
          </View>
          <Separator />
          <View style={styles.songContentContainer}>
            <ScrollView
              indicatorStyle="white"
              contentContainerStyle={styles.songScrollViewContainer}
            >
              <Text
                style={[
                  styles.text,
                  styles.contentText,
                  { fontSize: textSize },
                ]}
              >
                {selectedSong[1].content}
              </Text>
            </ScrollView>
          </View>
        </View>
        <Separator />
        <View style={styles.songBackContainer}>
          <View style={styles.bottomBarTextContainerSongScreen}>
            <TouchableOpacity
              onPress={() => {
                zoomHandler("-");
              }}
              style={styles.songContentButton}
            >
              <Image style={{ width: 25, height: 25 }} source={zoomOutPNG} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                zoomHandler("+");
              }}
              style={styles.songContentButton}
            >
              <Image style={{ width: 25, height: 25 }} source={zoomInPNG} />
            </TouchableOpacity>
            <View style={styles.songContentButton} />
            <TouchableOpacity
              onPress={backEvent}
              style={styles.songContentButton}
            >
              <Image style={{ width: 25, height: 25 }} source={undoPNG} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const onTextInputQueryChange = useCallback((query) => {
    setSearchQuery(query);
    const editedQuery = query
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s.-_\/]/g, "");
    const filteredData = songs.filter(
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
        data={songs}
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 68 : 0}
      >
        <TextInput
          placeholder="Cauta o cantare"
          placeholderTextColor="white"
          value={searchQuery}
          onChangeText={onTextInputQueryChange}
          style={styles.textInput}
        />
      </KeyboardAvoidingView>
      {selectedSong && renderSongContent()}
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
  // songButtonTextContainer: {
  // flex: 1,
  // marginLeft: 10,
  // justifyContent: "center",
  // },
  songButtonText: {
    fontSize: 17,
  },
  songContainer: {
    flex: 24,
    backgroundColor: "black",
  },
  songTitleContainer: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  songContentContainer: {
    flex: 50,
    width: "100%",
    backgroundColor: "black",
  },
  songScrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  titleText: {
    fontWeight: "bold",
  },
  contentText: {},
  textInput: {
    height: 50,
    paddingLeft: 15,
    backgroundColor: "black",
    color: "white",
    width: "100%",
    marginBottom: Platform.OS == "ios" ? 21 : 0,
    fontSize: 17,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  bottomBar: {
    width: "100%",
    backgroundColor: "red",
    marginBottom: Platform.OS == "ios" ? 21 : 0,
  },
  bottomBarTextContainerMainScreen: {
    // flexDirection: "row",
    backgroundColor: "purple",
  },
  songBackContainer: {
    backgroundColor: "black",
    flex: 2,
    paddingBottom: Platform.OS == "ios" ? 21 : 0,
  },
  bottomBarTextContainerSongScreen: {
    flex: 1,
    // alignItems: "center",
    // backgroundColor: "purple",
    flexDirection: "row",
  },
  songContentButton: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 20,
  },
  bottomBarText: {},
});

export default SongList;
