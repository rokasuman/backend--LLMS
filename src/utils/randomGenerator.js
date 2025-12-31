
export const randomGenerator = (length = 4) => {
  let str = "";
  for (let i = 0; i < length; i++) {
    const result = Math.floor(Math.random() * 10);
    str += result; // append the digit to the string
  }
  return str;
};