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
const windowWidth = Dimensions.get("window").width;

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
      {!veziCantare &&
        [...Cantari].map((cantare, index) => (
          <ButonCantare
            key={index}
            title={cantare.content
              .split("\n")[1]
              .replace(". ", cantare.id + ". ")
              .slice(1)}
            color="#ff5c5c"
            id={cantare.id}
          />
        ))}
      {veziCantare && (
        <>
          <View>
            <Text>
              {Cantari[numarCantare - 1].content
                .split("\n")[1]
                .replace(". ", Cantari[numarCantare - 1].id + ". ")
                .slice(1)}
            </Text>
            <ScrollView>
              <Text>{Cantari[numarCantare - 1].content}</Text>
            </ScrollView>
            <Button onPress={backEvent} title="BACK" />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  songContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  songTitle: {},
});
