import Cantari from "../Cantari.json";

import React from "react";
import { useState , useRef} from "react";
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
    console.log(buttonRef.current.props.title); // Accessing the "title" attribute of the button using the ref
    setCantare([true, 0]);
  };

  return (
    <Button
      ref={buttonRef} // Assigning the ref to the button component
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
          <ButonCantare  key={index} title={cantare.name} color="#ff5c5c" />
        ))}
      {veziCantare && <Button onPress={backEvent} title="BACK" />}
    </>
  );
}
