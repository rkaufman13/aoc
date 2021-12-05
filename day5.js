const exp = require("constants");
const fs = require("fs");

//part 1
const input = fs.readFileSync("day5 input.txt").toString().split(/\n/);

// for (let i = 20; i < 30; i++) {
//   console.log("line: ", input[i]);
//   const arrow = input[i].indexOf(" -> ");
//   const arrowAndLength = arrow + 4;

//   console.log("first half", input[i].slice(0, arrow));
//   console.log("second half: ", input[i].slice(arrowAndLength));
// }
//convert lines from 0,9 -> 5,9 to ['0,9','5,9']
for (item in input) {
  const arrow = input[item].indexOf(" -> ");
  const set1 = input[item].slice(0, arrow);
  const set2 = input[item].slice(arrow + 4);

  input[item] = [set1, set2];
}

for (let i = 20; i < 30; i++) {
  console.log(input[i]);
}
//explode lines from ['0,9','5,9'] to ['0,9','1,9','2,9' etc]

let explodedInput = [];

for (line in input) {
  const firstComma = input[line][0].indexOf(",");
  const firstXcoord = input[line][0].slice(0, firstComma);
  const firstYcoord = input[line][0].slice(firstComma + 1);

  const secondComma = input[line][1].indexOf(",");
  const secondXcoord = input[line][1].slice(0, secondComma);
  const secondYcoord = input[line][1].slice(secondComma + 1);

  if (firstXcoord === secondXcoord) {
    //get the y coordinates
    const startcoord = Math.min(parseInt(firstYcoord), parseInt(secondYcoord));
    const endcoord = Math.max(parseInt(firstYcoord), parseInt(secondYcoord));
    if (endcoord - startcoord > 1) {
      for (let i = startcoord; i <= endcoord; i++) {
        explodedInput.push([`${firstXcoord},${i}`]);
      }
    }
  } else if (firstYcoord === secondYcoord) {
    const startcoord = Math.min(parseInt(firstXcoord), parseInt(secondXcoord));
    const endcoord = Math.max(parseInt(firstXcoord), parseInt(secondXcoord));
    if (endcoord - startcoord > 1) {
      for (let i = startcoord; i <= endcoord; i++) {
        explodedInput.push([`${i},${firstYcoord}`]);
      }
    }
  }
}
for (let i = 0; i < 20; i++) {
  console.log(explodedInput[i]);
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
