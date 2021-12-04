import readInput from "../util/read-input.ts";
import createStringUnionValidator from "../util/string-union-validator.ts";

const directions = ["forward", "down", "up"] as const;
type Direction = typeof directions[number];
const validateDir = createStringUnionValidator<Direction>(directions);

const parseLine = (line: string) => {
  const [dir, amt] = line.split(" ");
  return { dir: validateDir(dir), amt: parseInt(amt, 10) };
};

const input = await readInput(parseLine, "day02/input");

const position = {
  x: 0,
  y: 0,
};
input.forEach(({ dir, amt }) => {
  switch (dir) {
    case "down":
      position.y += amt;
      break;
    case "up":
      position.y -= amt;
      break;
    case "forward":
      position.x += amt;
      break;
  }
});

console.log(position.x * position.y);
