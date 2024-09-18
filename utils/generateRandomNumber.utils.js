export const generateLongRandomNumber = (length) => {
  let randomNumber = '';
  while (randomNumber.length < length) {
    randomNumber += Math.floor(Math.random() * 10).toString();
  }
  return randomNumber;
}