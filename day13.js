const fs = require("fs");

const input = fs.readFileSync("day13 input.txt").toString().split(/\n/);

let paper = [];
let instructions = [];

const pad_array_horz = function (arr, len, direction) {
  return direction == "r"
    ? arr.concat(Array(len).fill(0))
    : Array(len).fill(0).concat(arr);
};

const pad_array_vert = function (arr, rows, direction) {
  const tempArr = new Array(rows).fill(0);
  for (let zero in tempArr) {
    tempArr[zero] = new Array(arr[0].length).fill(0);
  }
  return direction == "d" ? arr.concat(tempArr) : tempArr.concat(arr);
};

//separate paper coordinates and instructions
for (let line in input) {
  line = input[line].split(",");
  if (line.length > 1) {
    paper.push(line.map((i) => Number(i)));
  } else if (line[0] != "") {
    line = line[0].split("=");
    line[0] = line[0].split().pop();
    instructions.push(line);
  }
}
let Xes = [];
let Ys = [];
paper.forEach((coords) => {
  Xes.push(coords[0]);
  Ys.push(coords[1]);
});

//build initial array (there is probably a much faster way to do this that doesn't involve a bunch of nested loops, oh well)
let initialPaper = new Array(Math.max(...Ys) + 1);
initialPaper.fill(0);
for (let zero in initialPaper) {
  initialPaper[zero] = new Array(Math.max(...Xes) + 1);
  initialPaper[zero].fill(0);
}
for (let coord in paper) {
  initialPaper[paper[coord][1]][paper[coord][0]] = "x";
}

//now start folding
const fold = (paper, instructions) => {
  if (instructions[0].includes("y")) {
    let top = paper.slice(0, Number(instructions[1]));
    let bottom = paper.slice(Number(instructions[1]) + 1, paper.length);
    if (bottom.length < top.length) {
      bottom = pad_array_vert(bottom, top.length - bottom.length, "d");
    } else if (bottom.length > top.length) {
      top = pad_array_vert(top, bottom.length - top.length, "u");
    }
    bottom = bottom.reverse();

    for (let i = 0; i < bottom.length; i++) {
      for (let j = 0; j < bottom[i].length; j++) {
        if (bottom[i][j] == "x") {
          top[i][j] = "x";
        }
      }
    }
    return top;
  } else if (instructions[0].includes("x")) {
    for (let row in paper) {
      let left = paper[row].slice(0, Number(instructions[1]));

      let right = paper[row].slice(
        Number(instructions[1]) + 1,
        paper[row].length
      );
      if (right.includes("x")) {
        if (right.length < left.length) {
          right = pad_array_horz(right, left.length - right.length, "r");
        } else if (left.length < right.length) {
          left = pad_array_horz(left, right.length - left.length, "l");
        }
        right = right.reverse();

        for (let dot in right) {
          if (right[dot] == "x") {
            left[dot] = "x";
          }
        }
      }
      paper[row] = left;
    }
  }
  return paper;
};

let foldedPaper = [...initialPaper];
for (let line in instructions) {
  foldedPaper = fold(foldedPaper, instructions[line]);
}
for (let line in foldedPaper) {
  foldedPaper[line] = foldedPaper[line].map((e) => (e == 0 ? " " : e));
  console.log(foldedPaper[line].join(""));
}
