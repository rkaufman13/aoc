const fs = require("fs");

//part 1
const input = fs.readFileSync("day5 input.txt").toString().split(/\n/);

//convert lines from 0,9 -> 5,9 to ['0,9','5,9']
for (item in input) {
  const arrow = input[item].indexOf(" -> ");
  const set1 = input[item].slice(0, arrow);
  const set2 = input[item].slice(arrow + 4);

  input[item] = [set1, set2];
}
//explode lines from ['0,9','5,9'] to ['0,9','1,9','2,9' etc]

let explodedInput = [];

for (line in input) {
  const firstComma = input[line][0].indexOf(",");
  const firstXcoord = parseInt(input[line][0].slice(0, firstComma));
  const firstYcoord = parseInt(input[line][0].slice(firstComma + 1));

  const secondComma = input[line][1].indexOf(",");
  const secondXcoord = parseInt(input[line][1].slice(0, secondComma));
  const secondYcoord = parseInt(input[line][1].slice(secondComma + 1));

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
