const fs = require("fs");

fs.readFile("./day1 input.txt", "utf8", function (err, data) {
  const array = data.split(/\n/).map((i) => Number(i));

  let countIncrease = 0;
  let binnedCountIncrease = 0;

  for (let i = 0; i <= array.length; i++) {
    if (array[i + 1] >= array[i]) {
      countIncrease++;
    }
  }
  console.log(`base increases: ${countIncrease}`);

  for (let i = 0; i < array.length - 2; i++) {
    const sum1 = array[i] + array[i + 1] + array[i + 2];
    const sum2 = array[i + 1] + array[i + 2] + array[i + 3];

    if (sum2 > sum1) {
      binnedCountIncrease++;
    }
  }
  console.log(binnedCountIncrease);
});

//it's not 1481
