const fs = require("fs");

//part 1
const input = fs.readFileSync("day4 input.txt").toString();

const bingostrings = input.split(/\n/)[0].split(",");
let bingoNumbers = bingostrings.map((number) => Number(number));

const bingoCards = input.split(/\n/);

let cardsArray = [];

let winningCards = [];

//split cards into groups of 5 rows
for (let i = 2; i < bingoCards.length; i += 6) {
  let subArray = [];
  for (let j = 0; j < 6; j++) {
    if (bingoCards[i + j] != "" && bingoCards[i + j]) {
      subArray.push(
        bingoCards[i + j].split(" ").filter((number) => number != "")
      );
    }
  }
  cardsArray.push(subArray);
}

let win = false;

const playBingo = (cards, numbers) => {
  let playedNumbers = [];
  let winningCards = [];
  let finalResult;
  let loopLength = numbers.length;
  for (let i = 0; i < loopLength; i++) {
    if (!winningCards.length) {
      playedNumbers.push(numbers.shift());
      if (playedNumbers.length >= 5) {
        [winningCards, lastNumber] = checkWin(playedNumbers, cards);
      }
    }
  }
  if (winningCards.length) {
    finalResult = calculateOffs(winningCards[0], playedNumbers);
  }
  console.log(finalResult * lastNumber);
};

function transpose(array, arrayLength) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    newArray.push([]);
  }

  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < arrayLength; j++) {
      newArray[j].push(array[i][j]);
    }
  }

  return newArray;
}

function isTrue(arr, arr2) {
  return arr.every((i) => arr2.includes(i));
}

const checkWin = (numbers, cards) => {
  let winningCards = [];
  let lastnumber = 0;

  for (let i = 0; i < cards.length; i++) {
    //get one card at a time, convert values to numbers, and generate its transposed version
    card = cards[i];
    for (let row = 0; row < card.length; row++) {
      card[row] = card[row].map((v) => parseInt(v));
    }
    translatedCard = transpose(card, card.length);

    //now go through rows of each to check against called numbers

    for (let row = 0; row < card.length; row++) {
      if (isTrue(card[row], numbers) || isTrue(translatedCard[row], numbers)) {
        winningCards.push(card);

        lastnumber = numbers[numbers.length - 1];
      }
    }
  }
  return [winningCards, lastnumber];
};

const calculateOffs = (inputArray, numbers) => {
  inputArray = inputArray.flat(2);

  const off = inputArray.filter((item) => {
    return !numbers.includes(item);
  });
  console.log(off);
  const sum = off.reduce((a, b) => {
    return a + b;
  });

  return sum;
};

playBingo(cardsArray, bingoNumbers);
// determineWin(sampleBingoCard);
//console.log(winningCards[0].card);
// const sum = calculateOffs(winningCards[0].card);
// console.log(sum * winningCards[0].winningNumber);
//console.log(winningCards.map((card) => card.card));
// const sum = calculateOffs(off);
// console.log(sum * winningNumber);
