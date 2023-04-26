import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo"
import { useAtom } from "jotai";
import { themeAtom } from "./State";

const CustomCheckbox = (props) => {
  const [theme] = useAtom(themeAtom);
  const txtColor = theme == "dark" ? "white" : "black";
  const bgColor = theme == "dark" ? "black" : "white";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        checkboxBase: {
          margin: 5,
          width: 32,
          height: 32,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          borderWidth: 2,
          borderColor: txtColor,
          backgroundColor: "transparent",
        },
        checkboxChecked: {
          backgroundColor: txtColor,
        },
      }),
    [theme]
  );

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",
          height: 42,
          alignItems: "center",
          backgroundColor: bgColor,
          marginHorizontal: 10,
          marginVertical: 5,
          borderRadius: 4,
          backgroundColor: bgColor,
        }}
      >
        <View
          style={[styles.checkboxBase, props.checked && styles.checkboxChecked]}
        >
          {console.log(props.checked)}
          {props.checked == true ? (
            <>
              <Ionicons name="checkmark" size={25} color={bgColor} />
            </>
          ) : null}
        </View>
        <Text style={{ color: txtColor, fontWeight: 500, marginLeft: 5 }}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
