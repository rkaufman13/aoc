const fs = require("fs");

//part 1
fs.readFile("day3 input.txt", "utf8", function (err, data) {
  const array = data.split(/\n/);
  let gamma = [];
  let epsilon = [];

  for (let i = 0; i < array[0].length; i++) {
    let zeroCounter = 0;

    for (let j = 0; j < array.length; j++) {
      if (array[j][i] == 0) {
        zeroCounter++;
      }
      if (zeroCounter > array.length / 2) {
        gamma[i] = 0;
        epsilon[i] = 1;
      } else {
        gamma[i] = 1;
        epsilon[i] = 0;
      }
    }
  }

  const gammaInBase10 = parseInt(gamma.join(""), 2);
  const epsilonInBase10 = parseInt(epsilon.join(""), 2);

  const result = gammaInBase10 * epsilonInBase10;
  console.log(gammaInBase10 * epsilonInBase10);
});

//part 2

fs.readFile("day3 input.txt", "utf8", function (err, data) {
  let array = data.split(/\n/);

  const findOxygen = (inputArray) => {
    let array = [...inputArray];

    for (let i = 0; i < array[0].length; i++) {
      let zeroCounter = 0;
      if (array.length == 1) {
        console.log(array);
        return array;
      }
      for (let j = 0; j < array.length; j++) {
        if (array[j][i] == 0) {
          zeroCounter++;
        }
      }
      if (zeroCounter > array.length / 2) {
        array = array.filter((line) => {
          return line[i] == 0;
        });
      } else {
        array = array.filter((line) => {
          return line[i] != 0;
        });
      }
      console.log(array);
    }

    console.log(`oxygen: ${array}`);
    return array;
  };

  const findCOhToo = (inputArray) => {
    let array = [...inputArray];

    for (let i = 0; i < array[0].length; i++) {
      if (array.length === 1) {
        return array;
      }
      let zeroCounter = 0;

      for (let j = 0; j < array.length; j++) {
        if (array[j][i] == 0) {
          zeroCounter++;
        }
      }
      if (zeroCounter > array.length / 2) {
        array = array.filter((line) => {
          return line[i] != 0;
        });
      } else {
        array = array.filter((line) => {
          return line[i] == 0;
        });
      }
    }
    console.log(`co2: ${array}`);
  };

  const oxygen = findOxygen(array);
  const cohtoo = findCOhToo(array);

  console.log(oxygen);
  console.log(cohtoo);
  console.log(parseInt(oxygen.join(""), 2) * parseInt(cohtoo.join(""), 2));
});
