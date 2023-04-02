import Cantari from "../Cantari.json";
import React, { useState, memo, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Modal,
} from "react-native";
import CustomButton from "./CustomButton";
// import KeyboardShift from "@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift";

const songItemHeight = 40;

const SongList = memo(() => {
  const [selectedSong, setSelectedSong] = useState([false, -1]);

  const backEvent = () => {
    setSelectedSong([false, -1]);
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
        onPress={() => setSelectedSong([true, item.content])}
        text={item.content
          .split("\n")[1]
          .replace(". ", item.id + ". ")
          .slice(1)}
      />
    );
  }, []);

  const renderSongContent = () => (
    <Modal
      style={{ marginTop: 100 }}
      animationType="none"
      visible={selectedSong[0]}
      onRequestClose={() => console.log("test")}
      transparent={false}
    >
      <CustomButton
        onPress={backEvent}
        text="Back"
        style={{
          alignItems: "center",
          paddingVertical: 30,
          marginTop: 100,
          backgroundColor: "black",
        }}
      />
      <Text style={{ color: "black" }}>{selectedSong[1]}</Text>
    </Modal>
  );

  return (
    <View>
      <FlatList
        indicatorStyle="white"
        data={Cantari}
        renderItem={renderSongItem}
        keyExtractor={getKeyItem}
        style={styles.flatList}
        initialNumToRender={900}
        maxToRenderPerBatch={450}
        windowSize={150}
        getItemLayout={getItemLayout}
      />
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  songTitleContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  songContentContainer: {
    flex: 20,
    width: "100%",
  },
  songScrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  songBackContainer: {
    flex: 2,
    marginBottom: 10,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  titleText: {
    fontWeight: "bold",
  },
  contentText: {},
  bottomBar: {
    width: "100%",
    backgroundColor: "red",
    marginBottom: Platform.OS == "ios" ? 20 : 0,
  },
  bottomBarTextContainerMainScreen: {
    // flexDirection: "row",
    backgroundColor: "purple",
  },
  bottomBarTextContainerSongScreen: {
    flexDirection: "row",
    backgroundColor: "purple",
  },
  bottomBarText: {},
});

export default SongList;
