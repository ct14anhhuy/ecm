import { SPECIAL_CHARACTER } from "./commonConstants";

export const checkContainSpecialCharacters = inp => {
  for (let i = 0; i < SPECIAL_CHARACTER.length; i++) {
    if (inp.indexOf(SPECIAL_CHARACTER[i]) > -1) {
      return true;
    }
  }
  return false;
};
