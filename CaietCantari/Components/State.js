import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const themeButtonKey = "theme";

const storage = createJSONStorage(() => AsyncStorage)
const content = {list: []} // anything JSON serializable

export const favoritesList = atomWithStorage("favorites", content, storage);

export const themeAtom = atom("dark");