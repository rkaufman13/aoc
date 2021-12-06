const fs = require("fs");

const input = fs
  .readFileSync("day6 input.txt")
  .toString()
  .split(",")
  .map((i) => Number(i));
let array = input;

let counts = {};
array.forEach(function (x) {
  counts[x] = (counts[x] || 0) + 1;
});

const part1process = (array, day) => {
  let initialArrayLength = array.length;

  for (let i = 0; i < initialArrayLength; i++) {
    if (array[i] > 0) {
      array[i] = array[i] - 1;
    } else {
      array[i] = 6;
      array.push(8);
    }
  }
  return array;
};

const part2process = (object) => {
  object["temp"] = object["0"] || 0;
  for (let i = 0; i < 8; i++) {
    if (i < 8) {
      const nextNum = i + 1;
      if (object.hasOwnProperty(nextNum)) {
        if (i == 6) {
          object[i] = object[nextNum] + object["temp"];
        } else {
          object[i] = object[nextNum];
        }
      } else {
        object[i] = 0;
      }
    }
  }
  object["8"] = object["temp"];
  return object;
};

//part1
for (let i = 0; i < 80; i++) {
  array = part1process(array, i);
}

//part2
for (let i = 0; i < 256; i++) {
  counts = part2process(counts, i);
}
delete counts.temp;

console.log(array.length);
console.log(Object.values(counts).reduce((a, b) => a + b));
