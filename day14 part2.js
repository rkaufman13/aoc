const fs = require("fs");

const input = fs.readFileSync("day14 input.txt").toString().split(/\n/);

let template = input[0].split("");
let templateSplit = [];
for (let i = 0; i < template.length - 1; i++) {
  templateSplit.push(template[i].concat(template[i + 1]));
}

let counts = {};
templateSplit.forEach(function (x) {
  counts[x] = (counts[x] || 0) + 1;
});

let pairs = input.slice(2);

pairs = pairs.map((pair) => pair.split(" -> "));

const pairsObject = Object.fromEntries(pairs);

const insertElements = (counts) => {
  let newCounts = {};
  for (let element in counts) {
    if (counts[element] > 0) {
      //create the two new keys
      let element1 = element.split("")[0].concat(pairsObject[element]);
      let element2 = pairsObject[element].concat(element.split("")[1]);
      //increase counts of elements1 and 2
      newCounts[element1] = (newCounts[element1] || 0) + counts[element];
      newCounts[element2] = (newCounts[element2] || 0) + counts[element];
      counts[element] = 0;
    }
  }
  return newCounts;
};

for (let i = 0; i < 40; i++) {
  counts = insertElements(counts);
}
//now we have a possibly working count of the PAIRS but we need to create counts of the INDIVIDUAL ELEMENTS
//We just have to assume that every letter is counted twice but then account for the start and end of the input
let finalcounts = {};
for (let pair in counts) {
  if (counts[pair] > 0) {
    let [letter1, letter2] = pair.split("");
    finalcounts[letter1] = (finalcounts[letter1] || 0) + counts[pair];
    finalcounts[letter2] = (finalcounts[letter2] || 0) + counts[pair];
  }
}

for (let letter in finalcounts){
  if (letter=="O"){ //which we hardcode here because the start and end of the input in this case is "O"
    finalcounts[letter] +=2;
  }
  finalcounts[letter] = finalcounts[letter]/2

}

console.log(finalcounts);

let max = 0;
  let min = 999999999999; //hack hack hack
for (let element in finalcounts) {
  
  max = Math.max(finalcounts[element], max);
  min = Math.min(finalcounts[element], min); 
}

console.log(max- min);

