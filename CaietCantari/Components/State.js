import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const themeButtonKey = "theme";
export const textSizeKey = "textSizeKey";
export const imageSize = 30;

const storage = createJSONStorage(() => AsyncStorage);
const favoriteListObject = { list: [] }; // anything JSON serializable
const onlyCCObject = { isOnlyCC: false };

export const favoritesListAtom = atomWithStorage(
  "favorites",
  favoriteListObject,
  storage
);
export const onlyCCCheckboxAtom = atomWithStorage("onlyCC", onlyCCObject, storage);

export const themeAtom = atom("dark");
