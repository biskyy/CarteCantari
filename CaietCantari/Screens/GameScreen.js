import React from "react";

import { View } from "react-native";
import GameController from "./Game/GameController";
import { useAtom } from "jotai";
import { themeAtom } from "../Components/State";

const GameScreen = () => {
  const [theme] = useAtom(themeAtom)
  return (
    <View style={{ flex: 1, backgroundColor: theme == "dark" ? "black" : "white" }}>
      <GameController />
    </View>
  );
};

export default GameScreen;
