import React, { memo } from "react";
import { View } from "react-native";

const Separator = (props) => {

  return (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        height: 1,
        width: "100%",
      }}
    />
  );
};
export default memo(Separator);
