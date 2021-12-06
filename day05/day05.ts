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

const lines = await readInput((line): Line => {
  const [x1, y1, x2, y2] = line.split(" -> ").flatMap((point) =>
    point.split(",").map((n) => parseInt(n, 10))
  );
  return { x1, y1, x2, y2 };
}, "day05/input");

// all the input coordinates are positive and < 1000 so this is large enough
const diagram = Array(1000).fill(null).map(() => Array(1000).fill(0));

for (const line of lines) {
  if (isVert(line)) {
    let { x1: x, y1, y2 } = line;
    // ensure y1 is the smaller point
    if (y1 > y2) {
      [y1, y2] = [y2, y1];
    }
    for (let y = y1; y <= y2; y++) {
      diagram[y][x] += 1;
    }
  }

  if (isHoriz(line)) {
    let { y1: y, x1, x2 } = line;
    // ensure x1 is the smaller point
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
    }
    for (let x = x1; x <= x2; x++) {
      diagram[y][x] += 1;
    }
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
