import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import {
  generateRandom,
  getEmptyBoard,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  checkWin,
  isOver,
} from "./GameBoard";

import Cell from "./Cell";
import { useAtom } from "jotai";
import { themeAtom } from "../../Components/State";

var width = Dimensions.get("window").width;

const GameController = () => {
  const [theme] = useAtom(themeAtom);
  const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));
  const [hasWon, setHasWon] = useState(null);

  const txtColor = theme == "dark" ? "white" : "black";

  const styles = useMemo(
    () =>
      StyleSheet.create({
        headerStyle: {
          padding: 40,
          fontSize: 50,
          textAlign: "center",
          color: "olive",
          fontWeight: "bold",
        },
        boardStyle: {
          width: width,
          padding: 5,
          backgroundColor: "olive",
        },
        rowStyle: {
          flexDirection: "row",
          height: width / 4,
        },
        text: {
          color: txtColor,
          marginTop: 50,
          fontSize: 30,
          alignItems: "center",
          justifyContent: "center",
        },
      }),
    [theme]
  );

  const checkEndGame = () => {
    if (checkWin(board)) {
      setHasWon(true);
    } else if (isOver(board)) {
      setHasWon(false);
    }
  };

  const left = () => {
    const newBoard = moveLeft(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const right = () => {
    const newBoard = moveRight(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const up = () => {
    const newBoard = moveUp(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  const down = () => {
    const newBoard = moveDown(board);
    updateBoard(generateRandom(newBoard));
    checkEndGame();
  };

  return (
    <>
      {hasWon === null ? (
        <GestureRecognizer
          style={styles.screenStyle}
          onSwipeLeft={left}
          onSwipeRight={right}
          onSwipeUp={up}
          onSwipeDown={down}
        >
          <Text style={styles.headerStyle}>2048</Text>
          <View style={styles.boardStyle}>
            {board.map((row, rowIndex) => (
              <View key={`cell-${rowIndex}`} style={styles.rowStyle}>
                {row.map((value, cellIndex) => (
                  <Cell key={`cell-${cellIndex}`} value={value} />
                ))}
              </View>
            ))}
          </View>
        </GestureRecognizer>
      ) : hasWon === true ? (
        <View
          style={{ flex: 1, alignItems: "center"}}
        >
          <Text style={styles.text}>
            Ai castigat! Acum fii atent la predica =)
          </Text>
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center" }}
        >
          <Text style={styles.text}>Ai pierdut. Fii atent la predica!!</Text>
        </View>
      )}
    </>
  );
};

export default GameController;
