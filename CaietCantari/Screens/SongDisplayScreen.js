import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Separator from "../Components/Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const zoomInPNG = require("../assets/icons/zoom-in.png");
const zoomOutPNG = require("../assets/icons/zoom-out.png");
const undoPNG = require("../assets/icons/undo.png");
const textSizeKey = "textSizeKey";

const SongDisplayScreen = ({ route, navigation }) => {
  const { song } = route.params;
  const insets = useSafeAreaInsets();

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

  return (
    <>
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
            {song.title}
          </Text>
        </View>
        <Separator />
        <View style={styles.songContentContainer}>
          <ScrollView
            indicatorStyle="white"
            contentContainerStyle={styles.songScrollViewContainer}
          >
            <Text
              style={[styles.text, styles.contentText, { fontSize: textSize }]}
            >
              {song.content}
            </Text>
          </ScrollView>
        </View>
      </View>
      <Separator />
      <View
        style={[styles.songBackContainer, { paddingBottom: insets.bottom }]}
      >
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
            onPress={() => navigation.goBack()}
            style={styles.songContentButton}
          >
            <Image style={{ width: 25, height: 25 }} source={undoPNG} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SongDisplayScreen;

const styles = StyleSheet.create({
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
  songBackContainer: {
    backgroundColor: "black",
    flex: 2,
  },
  bottomBarTextContainerSongScreen: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "row",
  },
  songContentButton: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 20,
  },
});
