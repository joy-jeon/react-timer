import { atom } from "recoil";

export const isTimeAtom = atom({
  key: "isPlay",
  default: false,
});

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
