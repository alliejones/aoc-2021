import readInput from "../util/read-input.ts";

const fishes = (await readInput(
  (line) => line.split(",").map((n) => parseInt(n, 10)),
  "day06/input",
))[0];

const totalDays = 80;
for (let day = 0; day < totalDays; day++) {
  let newFishCount = 0;
  for (let i = 0; i < fishes.length; i++) {
    fishes[i]--;
    if (fishes[i] < 0) {
      fishes[i] = 6;
      newFishCount++;
    }
  }
  fishes.push(...Array(newFishCount).fill(8));
}

console.log(fishes.length);
