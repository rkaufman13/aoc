const fs = require("fs");

const input = fs.readFileSync("day5 input.txt").toString().split(/\n/);

//convert lines from 0,9 -> 5,9 to ['0,9','5,9']
for (item in input) {
  input[item] = input[item].split(" -> ");
}
//explode lines from ['0,9','5,9'] to ['0,9','1,9','2,9' etc]

let explodedInput = [];

for (line in input) {
  let [firstXcoord, firstYcoord] = input[line][0].split(",");
  let [secondXcoord, secondYcoord] = input[line][1].split(",");
  firstXcoord = parseInt(firstXcoord);
  secondXcoord = parseInt(secondXcoord);
  firstYcoord = parseInt(firstYcoord);
  secondYcoord = parseInt(secondYcoord);

  const xMultiplier =
    firstXcoord - secondXcoord < 0
      ? 1
      : firstXcoord - secondXcoord == 0
      ? 0
      : -1;
  const yMultiplier =
    firstYcoord - secondYcoord < 0
      ? 1
      : firstYcoord - secondYcoord == 0
      ? 0
      : -1;
  const xDiff = Math.abs(firstXcoord - secondXcoord);
  const yDiff = Math.abs(firstYcoord - secondYcoord);

  for (let i = 0; i <= Math.max(xDiff, yDiff); i++) {
    explodedInput.push([
      `${firstXcoord + i * xMultiplier},${firstYcoord + i * yMultiplier}`,
    ]);
  }
}

const counts = {};

explodedInput.forEach(function (x) {
  counts[x] = (counts[x] || 0) + 1;
});

const finalCounts = Object.values(counts).filter((i) => i > 1);

console.log(
  explodedInput.length,
  Object.keys(counts).length,
  finalCounts.length
);
