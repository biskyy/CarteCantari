import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

export const themeButtonKey = "theme"

// const storage = createJSONStorage(() => AsyncStorage);
// const content = { darkMode: true };
// export const darkModeAtom = atomWithStorage("renderMode", content, storage);
export const themeAtom = atom("dark");
// export const hasThemeLoaded = atom(false);
