const fs = require("fs");

const input = fs
  .readFileSync("day7 input.txt")
  .toString()
  .split(",")
  .map((i) => Number(i));

let crabs = input;

//okay time for some brute forcing

max = Math.max(...crabs);
min = Math.min(...crabs);
console.log(max, min);

//boy I think I'm being clever with these variable names, but note to future Rachel, crAbsRaw is going to be an array of arrays that holds the absolute values of "crabdistance" minus "position" (position in this case also being the index of the overall array)
let crAbsRaw = [];

//for each possible position the crabs can align to... INCLUSIVE of the min and max positions
for (let j = min; j <= max; j++) {
  //create a sub-array....
  let singleNumArray = [];
  //for each crab in the array.....
  for (let i = 0; i < crabs.length; i++) {
    //subtract the new position from the current position to get the total distance this crab would have to travel
    let crabValue = Math.abs(crabs[i] - j);
    singleNumArray.push(crabValue);
  }
  crAbsRaw.push(singleNumArray);
}

//again with the clever variable names, but this array should sum up the absolute values to find the total "crab submarine fuel" used to travel to each point
let crAbsValues = [];
for (let i = 0; i < crAbsRaw.length; i++) {
  const crabsValue = crAbsRaw[i].reduce((a, b) => a + b);
  crAbsValues.push(crabsValue);
}

const lowestFuel = Math.min(...crAbsValues);
console.log(lowestFuel);

console.log(crAbsValues.indexOf(Math.min(...crAbsValues)));
