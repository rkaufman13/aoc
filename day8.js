const fs = require("fs");

const input = fs.readFileSync("day8 input.txt").toString().split(/\n/);

//for part 1, we just have to count the number of 2, 3, 4 and 9 character strings in the second half of the input, so let's just get the second half of the input

let part1 = input;
for (let line in part1) {
  part1[line] = part1[line].split(" | ")[1];
}

//then let's turn each line into "digits" and filter out the ones that are the wrong length
for (let i in part1) {
  let line = part1[i].split(" ");
  line = line.filter((number) => {
    return (
      number.length == 2 ||
      number.length == 3 ||
      number.length == 4 ||
      number.length == 7
    );
  });
  part1[i] = line;
}
console.log(part1.flat().length);

const is2 = (number) => {
  return number
    .split("")
    .sort()
    .every((val, ind) => val == Object.keys(map)[2].split("").sort()[ind]);
};

const is3 = (number) => {
  return number
    .split("")
    .sort()
    .every((val, ind) => val == Object.keys(map)[4].split("").sort()[ind]);
};

const is5 = (number) => {
  return number
    .split("")
    .sort()
    .every((val, ind) => val == Object.keys(map)[1].split("").sort()[ind]);
};

const is6 = (number) => {
  return number
    .split("")
    .sort()
    .every((val, ind) => val == Object.keys(map)[6].split("").sort()[ind]);
};

const is9 = (number) => {
  return number
    .split("")
    .sort()
    .every((val, ind) => val == Object.keys(map)[5].split("").sort()[ind]);
};

const map = {
  acedgfb: 8,
  cdfbe: 5,
  gcdfa: 2,
  fbcad: 3,
  dab: 7,
  cefabd: 9,
  cdfgeb: 6,
  eafb: 4,
  cagedb: 0,
  ab: 1,
};

const createNumberMap = (sequence) => {
  sequence = sequence.split(" ");
  sequence = sequence.map((number) => number.split("").sort().join(""));
  let map = {};
  //let's do this slowly. first get out the 4 numbers we know for sure

  map[8] = "abcdefg";
  sequence.splice(sequence.indexOf("abcdefg"), 1);

  //going backwards here so that when we splice out the found numbers, we don't lose our place in the sequence...this made sense at the time
  for (let i = sequence.length - 1; i >= 0; i--) {
    if (sequence[i].length == 2) {
      map[1] = sequence[i];
      sequence.splice(i, 1);
    } else if (sequence[i].length == 3) {
      map[7] = sequence[i];
      sequence.splice(i, 1);
    } else if (sequence[i].length == 4) {
      map[4] = sequence[i];
      sequence.splice(i, 1);
    }
  }

  //find 9
  const topsegment = map[7] //the character that appears in 7 that isn't in 1  can this possibly be so complicated
    .split("")
    .filter((character) => !map["1"].split("").includes(character))
    .join("");

  sequence.forEach((number) => {
    if (
      number.length == 6 &&
      (map[4] + topsegment)
        .split("")
        .every((index) => number.split("").includes(index))
    ) {
      map[9] = number;
      sequence.splice(sequence.indexOf(number), 1);
    }
  });

  //find 0, a 6-segment number that isn't 9 AND DOES contain the digits in 7

  sequence.forEach((number) => {
    if (
      number.length == 6 &&
      number != map[9] &&
      map[7].split("").every((index) => number.split("").includes(index))
    ) {
      map[0] = number;
      sequence.splice(sequence.indexOf(number), 1);
    }
  });

  //find 6, the remaining 6-segment number
  sequence.forEach((number) => {
    if (number.length == 6 && number != map[9] && number != map[0]) {
      map[6] = number;
      sequence.splice(sequence.indexOf(number), 1);
    }
  });

  //find 5, which is 6 minus the bottom left segment
  //find the bottom-left segment, which is abcdefg minus the characters in 9

  const bottomleft = map[8]
    .split("")
    .filter((character) => !map[9].split("").includes(character))
    .join("");

  sequence.forEach((number) => {
    if (
      number.length == 5 &&
      map[6]
        .split("")
        .filter((character) => character != bottomleft)
        .sort()
        .join("") == number
    ) {
      map[5] = number;
      sequence.splice(sequence.indexOf(number), 1);
    }
  });

  //find 2, which is the only remaining number that contains the bottom left segment, and 3, the only remaining number that doesn't
  sequence.forEach((number) => {
    if (number.includes(bottomleft)) {
      map[2] = number;
    } else map[3] = number;
  });

  return map;
};

function invert(obj) {
  var retobj = {};
  for (var key in obj) {
    retobj[obj[key]] = key;
  }
  return retobj;
}

const mapSegmentsToOutput = (sequence, map) => {
  map = invert(map);

  sequence = sequence.split(" ");
  sequence = sequence.map((number) => number.split("").sort().join(""));
  for (let number in sequence) {
    sequence[number] = Number(map[sequence[number]]);
  }
  return sequence;
};

//I'm getting weird errors when I try to reuse the input from above so sticking with a fresh copy of the input file
let part2 = fs.readFileSync("day8 input.txt").toString().split(/\n/);
let output = [];
for (let line in part2) {
  let numbersMap = createNumberMap(part2[line].split(" | ")[0]);
  output.push(
    mapSegmentsToOutput(part2[line].split(" | ")[1], numbersMap).join("")
  );
  console.log(numbersMap, output);
}
console.log(output.reduce((a, b) => Number(a) + Number(b)));
// console.log(part2);
// console.log(part2.reduce((a, b) => Number(a) + Number(b)));
