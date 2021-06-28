export const checkContainSpecialCharacters = inp => {
  const specialChars = `\\|!#$%&/=?»«@£§€{};'<>,`;
  for (let i = 0; i < specialChars.length; i++) {
    if (inp.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
};
