const fs = require("fs");

const input = fs.readFileSync("day10 input.txt").toString().split(/\n/);

const opens = ["<", "(", "[", "{"];
const closes = [">", ")", "]", "}"];

const points = new Map();
points.set(")", 3);
points.set("]", 57);
points.set("}", 1197);
points.set(">", 25137);

let stack = [];
let badChars = [];

const checkForClose = (line) => {
  if (line.length <= 1) {
    stack = [];
    line = [];
    return false;
  } else {
    while (opens.includes(line[0])) {
      stack.push(line.shift());
    }
    while (stack && stack.length >= 1 && line.length > 0) {
      const openChar = stack[stack.length - 1]; //last character on stack
      let nextChar = line[0];

      const close = closes[opens.indexOf(openChar)]; //matching close
      if (nextChar == close) {
        stack.pop();
        line.shift();
      } else if (opens.includes(nextChar)) {
        checkForClose(line);
      } else if (closes.includes(nextChar)) {
        badChars.push(nextChar);
        stack = [];
        line = [];
        break;
      }
    }
  }
};

for (let eachLine in input) {
  let line = input[eachLine].split("");
  checkForClose(line);
}

console.log(badChars);
let counts = {};
badChars.forEach(function (x) {
  counts[x] = (counts[x] || 0) + 1;
});
let totalPoints = 0;

for (let symbol in counts) {
  totalPoints += counts[symbol] * points.get(symbol);
}

console.log(totalPoints);
