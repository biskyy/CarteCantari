import React, { memo } from "react";
import { View } from "react-native";

const Separator = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: 2,
        width: "100%",
      }}
    />
  );
};
export default memo(Separator);
