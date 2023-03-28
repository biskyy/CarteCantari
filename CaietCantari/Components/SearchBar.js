import React from "react";
import { Text, View } from "react-native";

const SearchBar = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{/* Your content goes here */}</View>
      <View style={{ position: "absolute", bottom: 20 }}>
        <Text>This is at the</Text>
      </View>
    </View>
  );
};

export default SearchBar;
