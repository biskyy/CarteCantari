import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Separator from "../Components/Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAtom } from "jotai";
import { favoritesListAtom, imageSize, themeAtom } from "../Components/State";
import { deactivateKeepAwake } from "expo-keep-awake";
import { MaterialIcons } from "@expo/vector-icons";
import { textSizeKey } from "../Components/State";

const SongDisplayScreen = ({ route, navigation }) => {
  const { song } = route.params;
  const insets = useSafeAreaInsets();
  const [theme] = useAtom(themeAtom);
  const [favoriteSongs, setFavoriteSongs] = useAtom(favoritesListAtom);
  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";

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
      width: imageSize,
      height: imageSize,
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
            <MaterialIcons name="zoom-out" size={imageSize} color={txtColor} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              zoomHandler("+");
            }}
            style={styles.songContentButton}
          >
            <MaterialIcons name="zoom-in" size={imageSize} color={txtColor} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleStarButton}
            style={styles.songContentButton}
          >
            {favoriteSongs.list.includes(song) ? <MaterialIcons name="star" color="gold" style={styles.image} size={imageSize}/> : <MaterialIcons name="star-border" size={imageSize} color={txtColor} style={styles.image}/>}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              deactivateKeepAwake();
            }}
            style={styles.songContentButton}
          >
            <MaterialIcons name="keyboard-backspace" size={imageSize} color={txtColor} style={styles.image}/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SongDisplayScreen;
