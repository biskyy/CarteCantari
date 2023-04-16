import React, { useMemo, useCallback } from "react";
import { useAtom } from "jotai";
import { favoritesList } from "../Components/State";
import { FlatList, StyleSheet, View } from "react-native";
import { themeAtom } from "../Components/State";
import CustomButton from "../Components/CustomButton";
import SearchBar from "../Components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const songItemHeight = 40;

const FavoritesList = (props) => {
  const [theme] = useAtom(themeAtom);
  const [favoriteSongs] = useAtom(favoritesList);
  const insets = useSafeAreaInsets()

  const bgColor = theme == "dark" ? "black" : "white";
  const txtColor = theme == "dark" ? "white" : "black";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        filteredflatList: {
          backgroundColor: bgColor,
          flex: 99999,
        },
        flatList: {
          backgroundColor: bgColor,
          flex: 1,
          marginLeft: 15,
        },
        container: {
          backgroundColor: bgColor,
          flex: 1,
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
        textInput: {
          height: 50,
          paddingLeft: 15,
          backgroundColor: bgColor,
          color: txtColor,
          width: "99%",
          fontSize: 17,
          borderWidth: 1,
          borderColor: txtColor,
          borderRadius: 10,
        },
        keyboardAvoidingView: {
          backgroundColor: bgColor,
          alignItems: "center",
        },
      }),
    [theme]
  );

  const getKeyItem = useCallback((item, index) => index, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: songItemHeight,
      offset: songItemHeight * index,
      index,
    }),
    []
  );

  const renderSongItem = useCallback(
    ({ item, index }) => {
      console.log(index);
      // console.log(item.title)
      return (
        <CustomButton
          style={styles.songButton}
          textStyle={styles.songButtonText}
          onPress={() => {
            props.navigation.navigate("SongDisplay", { song: item });
          }}
          text={item.title}
        />
      );
    },
    [theme]
  );

  return (
    <View style={{ backgroundColor: bgColor, flex: 1, paddingBottom: insets.bottom }}>
      <FlatList
        keyboardShouldPersistTaps='handled'
        indicatorStyle={txtColor}
        data={favoriteSongs.list}
        renderItem={renderSongItem}
        keyExtractor={getKeyItem}
        style={styles.flatList}
        maxToRenderPerBatch={1}
        windowSize={Platform.OS == "ios" ? 2 : 1}
        getItemLayout={getItemLayout}
      />
      <SearchBar navigation={props.navigation} list={favoriteSongs} atom={true}/>
    </View>
  );
};

export default FavoritesList;
