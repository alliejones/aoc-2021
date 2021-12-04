import readInput from "../util/read-input.ts";
const input = await readInput((line) => parseInt(line, 10), "day01/input");

const sums = [];
for (let i = 2; i < input.length; i++) {
  const prev = input[i - 1];
  const prev2 = input[i - 2];
  const curr = input[i];
  sums.push(prev + prev2 + curr);
}

let increaseCount = 0;
for (let i = 1; i < sums.length; i++) {
  const prev = sums[i - 1];
  const curr = sums[i];
  if (curr > prev) increaseCount++;
}

console.log(increaseCount);
