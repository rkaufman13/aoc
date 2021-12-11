const fs = require("fs");

const input = fs.readFileSync("day10 input.txt").toString().split(/\n/);

const opens = ["<", "(", "[", "{"];
const closes = [">", ")", "]", "}"];

const points = new Map();
points.set("(", 1).set("[", 2).set("{", 3).set("<", 4);

let stack = [];
let stacksToComplete = [];

const checkForClose = (line) => {
  if (line.length < 1 && stack.length > 0) {
    stacksToComplete.push(stack);
    stack = [];
    line = [];
  } else if (line.length < 1 && !stack.length) {
    return;
  } else {
    while (opens.includes(line[0])) {
      stack.push(line.shift());
    }
    if (stack && stack.length >= 1) {
      while (line.length > 0) {
        const openChar = stack[stack.length - 1] || "x"; //last character on stack
        let nextChar = line[0];

        const close = closes[opens.indexOf(openChar)]; //matching close
        if (nextChar == close) {
          stack.pop();
          line.shift();
        } else if (opens.includes(nextChar)) {
          checkForClose(line);
        } else if (closes.includes(nextChar)) {
          //badChars.push(nextChar);
          stack = [];
          line = [];
          return false;
        }
      }

      if (line.length < 1 && stack.length > 0) {
        //this is not DRY but hey, we're underwater
        stacksToComplete.push(stack);
        stack = [];
        line = [];
      } else if (line.length > 1) {
        checkForClose(line);
      } else {
        return;
      }
    } else {
      return;
    }
  }
};

for (let eachLine in input) {
  let line = input[eachLine].split("");
  checkForClose(line);
}

//console.log(badChars);
let counts = {};
let totalPointsArray = [];

for (let stack in stacksToComplete) {
  let totalPoints = 0;
  stacksToComplete[stack].reverse();
  for (let i = 0; i < stacksToComplete[stack].length; i++) {
    totalPoints *= 5;
    totalPoints += points.get(stacksToComplete[stack][i]);
  }
  totalPointsArray.push(totalPoints);
}

//console.log(totalPointsArray);
totalPointsArray = totalPointsArray.sort((a, b) => Number(a) - Number(b));
const midpoint = (totalPointsArray.length - 1) / 2;

console.log(totalPointsArray[midpoint]);
