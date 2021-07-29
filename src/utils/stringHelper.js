import { SPECIAL_CHARACTER } from "constants/commonConstants";

export const checkContainSpecialCharacters = inp => {
  for (let i = 0; i < SPECIAL_CHARACTER.length; i++) {
    if (inp.indexOf(SPECIAL_CHARACTER[i]) > -1) {
      return true;
    }
  }
  return false;
};

export const extractFileExts = obj => {
  let types = [];
  for (const val of Object.values(obj)) {
    types = [...types, ...val];
  }
  return types.map(t => "." + t).join(",");
};
