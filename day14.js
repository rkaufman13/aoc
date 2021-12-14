const fs = require("fs");

const input = fs.readFileSync("day14 input.txt").toString().split(/\n/);

let template = input[0];

let pairs = input.slice(2);

pairs = pairs.map((pair) => pair.split(" -> "));

const pairsObject = Object.fromEntries(pairs);

const pairsKeys = Object.keys(pairsObject); //roundabout way of just getting the keys I guess

const insert = (template) => {
  let newString = template;
  let cursorPos = 1;
  for (let i = 0; i < template.length - 1; i++) {
    const matchingPair = template[i].concat(template[i + 1]);
    if (pairsKeys.includes(matchingPair)) {
      newString =
        newString.slice(0, cursorPos) +
        pairsObject[matchingPair] +
        newString.slice(cursorPos);
      cursorPos += 2;
    } else {
      cursorPos += 1;
    }
  }
  return newString;
};

for (let i = 0; i < 10; i++) {
  template = insert(template); //run the process 10 times
}

let counts = {};
template.split("").forEach(function (x) {
  counts[x] = (counts[x] || 0) + 1;
});
console.log(counts);

let max = 0;
  let min = 0;
for (let element in counts) {
  
  max = Math.max(counts[element], max);
  min = Math.min(counts[element], max); //not a typo, a dumb hack to make sure min doesn't return 0
}

console.log(max- min);
