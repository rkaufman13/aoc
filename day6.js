const fs = require("fs");

const input = fs
  .readFileSync("day6 input.txt")
  .toString()
  .split(",")
  .map((i) => Number(i));
let array = input;
const process = (array, day) => {
  let initialArrayLength = array.length;
  //console.log(`beginning of day ${day}: ${array}`);
  for (let i = 0; i < initialArrayLength; i++) {
    if (array[i] > 0) {
      array[i] = array[i] - 1;
      //   if (array[i] == 6) {

      //   }
    } else {
      array[i] = 6;
      array.push(8);
    }
  }

  return array;
};

for (let i = 0; i < 256; i++) {
  array = process(array, i);
}

console.log(array.length);
