import React, { useMemo } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import CustomButton from "./CustomButton";
import { useAtom } from "jotai";
import { themeAtom } from "./State";

const songItemHeight = 40;
const screenWidth = Dimensions.get("window").width;

const CustomList = (props) => {
  const [theme] = useAtom(themeAtom);

  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        flatList: {
          backgroundColor: bgColor,
          flex: 1,
          marginLeft: 10,
        },
        songButton: {
          flex: 1,
          maxHeight: songItemHeight,
          minHeight: songItemHeight,
          justifyContent: "center",
        },
        songButtonText: {
          color: txtColor,
          fontSize: 17,
        },
      }),
    [theme]
  );

  const list = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
    props.data
  );
  const emptyList = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows([
    { title: "", id: 9999, book_id: "EMPTY" },
  ]);
  const layoutProvider = new LayoutProvider(
    (index) => {
      return list.getSize() !== 0
        ? list.getDataForIndex(index).book_id
        : emptyList.getDataForIndex(index).book_id;
    },
    (type, dim) => {
      switch (type) {
        case "Cor":
          dim.height = songItemHeight;
          dim.width = screenWidth;
          break;
        case "EMPTY":
          dim.height = 0;
          dim.width = 0;
          break;
        default:
          dim.height = songItemHeight;
          dim.width = screenWidth;
          break;
      }
      dim.height = songItemHeight;
      dim.width = screenWidth;
    }
  );
  const rowRenderer = (index, data) => {
    return (
      <CustomButton
        style={styles.songButton}
        textStyle={styles.songButtonText}
        onPress={() => {
          props.navigation.navigate("SongDisplay", { song: data });
        }}
        text={data.title}
        disabled={data.id == 9999 ? true : false}
      />
    );
  };

  return (
    <RecyclerListView
      keyboardShouldPersistTaps="handled"
      applyWindowCorrection={
        (xOffset, yOffset, windowCorrection) => {windowCorrection.endCorrection = 100}
      }
      style={styles.flatList}
      rowRenderer={rowRenderer}
      dataProvider={list.getSize() !== 0 ? list : emptyList}
      layoutProvider={layoutProvider}
    />
  );
};

export default CustomList;
