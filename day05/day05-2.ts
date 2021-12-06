import readInput from "../util/read-input.ts";

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const isHoriz = (line: Line): boolean => {
  return line.y1 === line.y2;
};

const isVert = (line: Line): boolean => {
  return line.x1 === line.x2;
};

const getXDir = (line: Line): number => {
  if (isVert(line)) return 0;
  return line.x1 < line.x2 ? 1 : -1;
};

const getYDir = (line: Line): number => {
  if (isHoriz(line)) return 0;
  return line.y1 < line.y2 ? 1 : -1;
};

const lines = await readInput((line): Line => {
  const [x1, y1, x2, y2] = line.split(" -> ").flatMap((point) =>
    point.split(",").map((n) => parseInt(n, 10))
  );
  return { x1, y1, x2, y2 };
}, "day05/input");

// all the input coordinates are positive and < 1000 so this is large enough
const diagram = Array(1000).fill(null).map(() => Array(1000).fill(0));

for (const line of lines) {
  const { x1, y1, x2, y2 } = line;
  const xDir = getXDir(line);
  const yDir = getYDir(line);
  const length = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

  let currX = x1;
  let currY = y1;
  for (let i = 0; i <= length; i++) {
    diagram[currY][currX] += 1;
    currX += xDir;
    currY += yDir;
  }
}

const overlaps = diagram.reduce((total, line) => {
  return total +
    line.reduce(
      (lineTotal, lineCountAtPoint) =>
        lineCountAtPoint > 1 ? lineTotal + 1 : lineTotal,
      0,
    );
}, 0);

console.log(overlaps);
