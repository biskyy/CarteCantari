export const longPressHandler = (navigation, routeName) => {
  routeName == "SongDisplay"
              ? navigation.navigate("2048")
              : null
}