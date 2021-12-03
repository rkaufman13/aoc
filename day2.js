const fs = require("fs");

let coords = [0, 0]; //horizontal, depth
let coordsWithAim = [0, 0, 0]; //horizontal, depth, aim

fs.readFile("./day2 input.txt", "utf8", function (err, data) {
  const array = data.split(/\n/);

  const part1 = () => {
    for (let i = 0; i < array.length; i++) {
      const line = array[i].split(" ");

      if (line[0] == "forward") {
        coords[0] += Number(line[1]);
      } else if (line[0] == "up") {
        coords[1] -= Number(line[1]);
      } else {
        coords[1] += Number(line[1]);
      }
    }
    console.log(coords);
    console.log(coords[0] * coords[1]);
  };

  const part2 = () => {
    for (let i = 0; i < array.length; i++) {
      const line = array[i].split(" ");

      if (line[0] == "forward") {
        coordsWithAim[0] += Number(line[1]);
        coordsWithAim[1] += Number(line[1] * coordsWithAim[2]);
      } else if (line[0] == "up") {
        coordsWithAim[2] -= Number(line[1]);
      } else {
        coordsWithAim[2] += Number(line[1]);
      }
    }
    console.log(coordsWithAim);
    console.log(coordsWithAim[0] * coordsWithAim[1]);
  };

  part1();

  part2();
});
