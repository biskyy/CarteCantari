import React, { memo } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const CustomButton = (props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={props.style}>
        <View style={props.textContainerStyle}>
          <Text style={[{ color: "white" }, props.textStyle]}>
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default memo(CustomButton);
