const fs = require("fs");

const input = fs.readFileSync("day9 input.txt").toString().split(/\n/);

for (let line in input) {
  input[line] = input[line].split("");
}
//now our starting input is a 2d array and we should be able to check all coordinates against all orthogonal coordinates

let lowPoints = [];
for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input.length; y++) {
    if (y > 0 && x > 0 && y < input.length - 1 && x < input.length - 1) {
      let matrix = [
        input[x + 1][y],
        input[x][y + 1],
        input[x - 1][y],
        input[x][y - 1],
      ];
      if (matrix.every((point) => point > input[x][y])) {
        lowPoints.push(input[x][y]);
      }
    } else if (x == 0 && y > 0 && y < input.length - 1) {
      //if x is 0, we can't go further to the left than x, although this array is backwards so x actually refers to the rows of the array
      if (
        input[x][y] < input[x + 1][y] &&
        input[x][y] < input[x][y + 1] &&
        input[x][y] < input[x][y - 1]
      ) {
        lowPoints.push(input[x][y]);
      }
    } else if (y == 0 && x < input.length - 1 && x > 0) {
      //if y is 0, we can't go "higher" than y, but this array is backwards so it actually means we can't go further to the left
      if (
        input[x][y] < input[x + 1][y] &&
        input[x][y] < input[x][y + 1] &&
        input[x][y] < input[x - 1][y]
      ) {
        lowPoints.push(input[x][y]);
      }
    } else if (y == input.length - 1 && x > 0 && x < input.length - 1) {
      //if y is on the edge of the board (in this case the bottom row) we can't go further past y

      if (
        input[x][y] < input[x + 1][y] &&
        input[x][y] < input[x - 1][y] &&
        input[x][y] < input[x][y - 1]
      ) {
        lowPoints.push(input[x][y]);
      }
    } else if (x == input.length - 1 && y < input.length - 1 && y > 0) {
      if (
        input[x][y] < input[x][y + 1] &&
        input[x][y] < input[x - 1][y] &&
        input[x][y] < input[x][y - 1]
      ) {
        lowPoints.push(input[x][y]);
      }
    }
    //ugh these loops just handle literal edge cases but not corners. so here we go again
    else if (x == input.length - 1 && y == input.length - 1) {
      if (input[x][y] < input[x - 1][y] && input[x][y] < input[x][y - 1]) {
        lowPoints.push(input[x][y]);
      }
    } else if (x == input.length - 1 && y == 0) {
      if (input[x][y] < input[x - 1][y] && input[x][y] < input[x][y + 1]) {
        lowPoints.push(input[x][y]);
      }
    } else if (x == 0 && y == input.length - 1) {
      if (input[x][y] < input[x + 1][y] && input[x][y] < input[x][y - 1]) {
        lowPoints.push(input[x][y]);
      }
    } else if (x == 0 && y == 0) {
      if (input[x][y] < input[x + 1][y] && input[x][y] < input[x][y + 1]) {
        lowPoints.push(input[x][y]);
      }
    }
  }
}

lowPoints = lowPoints.map((i) => Number(i)).map((i) => i + 1);

console.log(lowPoints.reduce((a, b) => a + b));
