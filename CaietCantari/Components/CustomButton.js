import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { themeAtom } from "./State";
import { useAtom } from "jotai";


const CustomButton = (props) => {
  // const [theme] = useAtom(themeAtom)
  // const txtColor = theme == "dark" ? "white" : "black"
  const txtColor="white"

  const styles = StyleSheet.create({
    txt: {
      color: txtColor,
    },
  });
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <Text style={[props.textStyle]}>{props.text}</Text>
      </TouchableOpacity>
    </>
  );
};

export default memo(CustomButton);
