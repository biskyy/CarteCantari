import Cantari from "../Cantari.json";

import React from "react";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import Separator from "./Separator";

export default function SongList() {
  const [[veziCantare, numarCantare], setCantare] = useState([false, -1]);

  ///////////////////////////////////////////////////////Cantare COmponent
  const ButonCantare = (props) => {
    const buttonRef = useRef(null); // Defining a ref

    const handlePress = () => {
      // console.log(buttonRef.current.props.id); // Accessing the "title" attribute of the button using the ref
      setCantare([true, buttonRef.current.props.id]);
    };

    return (
      <Button
        ref={buttonRef} // Assigning the ref to the button component
        id={props.id}
        title={props.title}
        onPress={handlePress}
        color={props.color}
      />
    );
  };

  ///////////////////////////////////////////////////////Cantare COmponent

  const backEvent = () => {
    setCantare([false, -1]);
  };

  return (
    <>
      <View style={{ backgroundColor: "black", flex: 1 }}>
        {!veziCantare &&
          [...Cantari].map((cantare, index) => (
            <ButonCantare
              key={index}
              title={cantare.content
                .split("\n")[1]
                .replace(". ", cantare.id + ". ")
                .slice(1)}
              color={Platform.OS == "android" ? "black" : "white"}
              id={cantare.id}
            />
          ))}
        {veziCantare && (
          <>
            <View style={styles.songContainer}>
              <View style={styles.songTitleContainer}>
                <Text style={[styles.text, styles.titleText]}>
                  {Cantari[numarCantare - 1].content
                    .split("\n")[1]
                    .replace(". ", Cantari[numarCantare - 1].id + ". ")
                    .slice(1)}
                </Text>
              </View>
              <Separator />
              <View style={styles.songContentContainer}>
                <ScrollView
                  indicatorStyle="white"
                  contentContainerStyle={styles.songScrollViewContainer}
                >
                  <Text style={[styles.text, styles.contentText]}>
                    {Cantari[numarCantare - 1].content}
                  </Text>
                </ScrollView>
              </View>
              <View style={styles.songBackContainer}>
                <Button
                  onPress={backEvent}
                  title="BACK"
                  color={Platform.OS == "android" ? "black" : "white"}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
});
