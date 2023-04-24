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
import { useAtom } from "jotai";
import { favoritesListAtom, themeAtom } from "../Components/State";
import { deactivateKeepAwake } from "expo-keep-awake";

const lightZoomInPNG = require("../assets/icons/light-zoom-in-min.png");
const darkZoomInPNG = require("../assets/icons/dark-zoom-in-min.png");
const lightZoomOutPNG = require("../assets/icons/light-zoom-out-min.png");
const darkZoomOutPNG = require("../assets/icons/dark-zoom-out-min.png");
const lightUndoPNG = require("../assets/icons/light-undo-min.png");
const darkUndoPNG = require("../assets/icons/dark-undo-min.png");
const darkStarPNG = require("../assets/icons/dark-star-min.png");
const lightStarPNG = require("../assets/icons/light-star-min.png");
const yellowStarPNG = require("../assets/icons/yellow-star-min.png");
const textSizeKey = "textSizeKey";

const SongDisplayScreen = ({ route, navigation }) => {
  const { song } = route.params;
  const insets = useSafeAreaInsets();
  const [theme] = useAtom(themeAtom);
  const [favoriteSongs, setFavoriteSongs] = useAtom(favoritesListAtom);
  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";
  const zoomInPNG = theme == "light" ? darkZoomInPNG : lightZoomInPNG;
  const zoomOutPNG = theme == "light" ? darkZoomOutPNG : lightZoomOutPNG;
  const undoPNG = theme == "light" ? darkUndoPNG : lightUndoPNG;
  const starPNG = theme == "dark" ? lightStarPNG : darkStarPNG;

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

  const handleStarButton = () => {
    if (favoriteSongs.list.includes(song))
      setFavoriteSongs({
        list: [
          ...favoriteSongs.list.filter((songToFilter) => {
            return songToFilter !== song;
          }),
        ],
      });
    // setFavoriteSongs({list: []})
    else setFavoriteSongs({ list: [...favoriteSongs.list, song] });
  };

  const styles = StyleSheet.create({
    songContainer: {
      flex: 24,
      backgroundColor: bgColor,
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
      backgroundColor: bgColor,
    },
    songScrollViewContainer: {
      flexGrow: 1,
      alignItems: "center",
    },
    text: {
      color: txtColor,
      fontSize: 20,
    },
    titleText: {
      fontWeight: "bold",
    },
    songBackContainer: {
      backgroundColor: bgColor,
      flex: 2,
    },
    bottomBarTextContainerSongScreen: {
      backgroundColor: bgColor,
      flex: 1,
      flexDirection: "row",
    },
    songContentButton: {
      flex: 1,
      backgroundColor: bgColor,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 20,
    },
    image: {
      backgroundColor: bgColor,
      width: 50,
      height: 50,
    },
  });

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
        <Separator backgroundColor={txtColor} />
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
      <Separator backgroundColor={txtColor} />
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
            <Image style={styles.image} source={zoomOutPNG} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              zoomHandler("+");
            }}
            style={styles.songContentButton}
          >
            <Image style={styles.image} source={zoomInPNG} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleStarButton}
            style={styles.songContentButton}
          >
            <Image
              style={styles.image}
              source={
                favoriteSongs.list.includes(song) ? yellowStarPNG : starPNG
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              deactivateKeepAwake();
            }}
            style={styles.songContentButton}
          >
            <Image style={styles.image} source={undoPNG} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SongDisplayScreen;
