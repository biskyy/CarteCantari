import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function CustomButton(props) {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text style={props.titleStyle}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
