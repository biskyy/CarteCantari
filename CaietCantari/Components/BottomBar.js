import React, { memo } from "react";
import { Text, View } from "react-native";
import Separator from "./Separator";

const BottomBar = (props) => {
  return (
    <>
      <Separator />
      <View style={props.style}>
        <View style={props.textContainerStyle}>{props.children}</View>
      </View>
    </>
  );
};

export default memo(BottomBar);
