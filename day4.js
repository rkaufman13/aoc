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
        bingoCards[i + j]
          .split(" ")
          .filter((number) => number != "")
          .map((i) => parseInt(i))
      );
    }
  }
  cardsArray.push(subArray);
}

const playBingo = (cards, numbers) => {
  let playedNumbers = [];
  let winningCards = [];
  let lastNumber;
  let finalResult;
  let loopLength = numbers.length;
  let initialCardLength = cards.length;
  for (let i = 0; i < loopLength; i++) {
    playedNumbers.push(numbers.shift());

    if (playedNumbers.length >= 5 && winningCards.length < initialCardLength) {
      [winningCards, cards] = checkWin(playedNumbers, cards);
      console.log("winning cards: ", winningCards.length);
    } else if (cards.length <= 2 || winningCards.length == initialCardLength) {
      lastNumber = playedNumbers[playedNumbers.length - 2];
      console.log("the winning card is", winningCards[winningCards.length - 1]);
      console.log("the last number was " + lastNumber);
      finalResult = calculateOffs(
        winningCards[winningCards.length - 1],
        playedNumbers
      );
      break;
    }
  }
  console.log(finalResult * lastNumber, finalResult, lastNumber);
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
  let lastnumber = 0;

  for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    translatedCard = transpose(card, card.length);

    //now go through rows of each to check against called numbers

    for (let row = 0; row < card.length; row++) {
      if (isTrue(card[row], numbers) || isTrue(translatedCard[row], numbers)) {
        winningCards.push(card);
        console.log(
          "pushing 1 card to winningcards, now has length " +
            winningCards.length
        );
        lastnumber = numbers[numbers.length - 1];
        console.log(lastnumber);
        cards.splice(i, 1);
        console.log("removed card from cards, now has length " + cards.length);
      }
    }
  }
  console.log(winningCards[winningCards.length - 2]);
  return [winningCards, cards];
};

const calculateOffs = (inputArray, numbers) => {
  //this function is perfect stop touching it
  inputArray = inputArray.flat(2);
  numbers.pop(); ///DO NOT REMOVE THIS
  const off = inputArray.filter((item) => {
    return !numbers.includes(item);
  });
  const sum = off.reduce((a, b) => {
    return a + b;
  });

  return sum;
};

playBingo(cardsArray, bingoNumbers);
