import Cantari from "../Cantari.json";
import React, { useState, memo, useCallback, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  VirtualizedList,
  ScrollView,
} from "react-native";
import CustomButton from "./CustomButton";
import KeyboardShift from "@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift";
import NavBar from "./NavBar";
import Separator from "./Separator";

const songItemHeight = 40;

const SongList = memo(() => {
  const [selectedSong, setSelectedSong] = useState([false, Cantari[0]]);
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState(Cantari);
  const [textSize, setTextSize] = useState(20);

  const zoomIn = () => {
    setTextSize(textSize + 2);
  };
  const zoomOut = () => {
    if (textSize > 2) setTextSize(textSize - 2);
  };

  const backEvent = () => {
    setSelectedSong([false, Cantari[0]]);
    console.log("pressed back");
  };

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
        text={item.content
          .split("\n")[1]
          .replace(". ", item.id + ". ")
          .slice(1)}
      />
    );
  }, []);

  const renderSongContent = () => {
    return (
      <Modal
        animationType="none"
        visible={selectedSong[0]}
        onRequestClose={() => console.log("test")}
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
              {selectedSong[1].content
                .split("\n")[1]
                .replace(". ", selectedSong[1].id + ". ")
                .slice(1)}
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
            <CustomButton
              onPress={zoomOut}
              textContainerStyle={{ justifyContent: "center", flex: 1 }}
              text="Zoom Out"
              style={styles.songContentButton}
            />
            <CustomButton
              onPress={zoomIn}
              textContainerStyle={{ justifyContent: "center", flex: 1 }}
              text="Zoom In"
              style={styles.songContentButton}
            />
            <View style={styles.songContentButton} />
            <CustomButton
              onPress={backEvent}
              textContainerStyle={{ justifyContent: "center", flex: 1 }}
              text="Back"
              style={styles.songContentButton}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const onTextInputQueryChange = useCallback((query) => {
    setSearchQuery(query);
    // console.log(query);
    // const filteredData = songs.filter((song) =>
    //   song.id.toString().includes(query)
    // );
    // setSongs(filteredData);
  }, []);

  const renderFilteredList = () => {
    <Modal animationType="none" transparent={false} visible={searchQuery != ""}>
      <Text>Test</Text>
    </Modal>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        indicatorStyle="white"
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={getKeyItem}
        style={styles.flatList}
        initialNumToRender={900}
        maxToRenderPerBatch={450}
        windowSize={900}
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
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  songButton: {
    flex: 1,
    maxHeight: songItemHeight,
    minHeight: songItemHeight,
  },
  songButtonTextContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
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
