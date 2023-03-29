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
  Touchable,
  TouchableOpacity,
} from "react-native";
import Separator from "./Separator";
import CustomButton from "./CustomButton";

export default function SongList() {
  const [[veziCantare, numarCantare], setCantare] = useState([false, -1]);

  const handlePress = (id) => {
    // console.log(buttonRef.current.props.id); // Accessing the "title" attribute of the button using the ref
    setCantare([true, id]);
  };
  ///////////////////////////////////////////////////////Cantare COmponent
  const ButonCantare = (props) => {
    const buttonRef = useRef(null); // Defining a ref

    return (
      <TouchableOpacity
        style={{ color: "white" }}
        ref={buttonRef} // Assigning the ref to the button component
        id={props.id}
        title={props.title}
        onPress={() => handlePress(props.id)}
        color={props.color}
      >
        <Text style={{ color: "white" }}>{props.title}</Text>
      </TouchableOpacity>
    );
  };

  ///////////////////////////////////////////////////////Cantare COmponent

  const backEvent = () => {
    setCantare([false, -1]);
  };

  return (
    <>
      <View style={{ backgroundColor: "black", flex: 1 }}>
        {!veziCantare && (
          <>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              indicatorStyle="white"
            >
              {[...Cantari].map((cantare, index) => (
                <CustomButton
                  key={index}
                  text={cantare.content
                    .split("\n")[1]
                    .replace(". ", cantare.id + ". ")
                    .slice(1)}
                  textStyle={styles.songButtonText}
                  textContainerStyle={styles.songButtonTextContainer}
                  style={styles.songButton}
                  onPress={() => handlePress(cantare.id)}
                />
              ))}
            </ScrollView>
          </>
        )}
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
  songButton: { flex: 1, maxHeight: 40 },
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
});
