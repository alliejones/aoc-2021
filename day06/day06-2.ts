import readInput from "../util/read-input.ts";

const states = (await readInput(
  (line) => line.split(",").map((n) => parseInt(n, 10)),
  "day06/input",
))[0];

// each index is the number of fish with that counter value
const fishByCounterVal = Array(9).fill(0);
states.forEach((val) => fishByCounterVal[val]++);

const totalDays = 256;
for (let day = 0; day < totalDays; day++) {
  const reproducingFishCount = fishByCounterVal.shift();
  fishByCounterVal[6] += reproducingFishCount;
  fishByCounterVal.push(reproducingFishCount);
}

const count = fishByCounterVal.reduce((count, val) => count + val, 0);
console.log(count);
