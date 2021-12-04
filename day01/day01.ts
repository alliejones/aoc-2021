import readInput from "../util/read-input.ts";
const input = await readInput((line) => parseInt(line, 10), "day01/input");

let increaseCount = 0;
for (let i = 1; i < input.length; i++) {
  const prev = input[i - 1];
  const curr = input[i];
  if (curr > prev) increaseCount++;
}

console.log(increaseCount);
