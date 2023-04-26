import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Cell = ({ value }) => {
  return (
    <View style={[styles.cellStyle, styles[`cell${value}`]]}>
      <Text style={styles.textStyle}>
        {value > 0 ? value : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cellStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5
  },
  cell2: {
    backgroundColor: "orange"
  },
  cell4: {
    backgroundColor: "rgb(39, 207, 207)"
  },
  cell8: {
    backgroundColor: "pink"
  },
  cell16: {
    backgroundColor: "gold"
  },
  cell32: {
    backgroundColor: "greenyellow"
  },
  cell64: {
    backgroundColor: "#e9c46a"
  },
  cell128: {
    backgroundColor: "goldenrod"
  },
  cell256: {
    backgroundColor: "rebeccapurple"
  },
  cell512: {
    backgroundColor: "cyan"
  },
  cell1024: {
    backgroundColor: "gold"
  },
  cell2048: {
    backgroundColor: "aquamarine"
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default Cell;
