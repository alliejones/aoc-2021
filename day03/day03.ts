import readInput from "../util/read-input.ts";
const input = await readInput((line) => line, "day03/input");

const size = input[0].length;
const inputCount = input.length;

const countValue = (values: string[], checkValue: string, pos: number) => {
  return values.reduce((count, value) => {
    if (value[pos] === checkValue) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
};

const counts = [];
for (let i = 0; i < size; i++) {
  counts.push(countValue(input, "1", i));
}

const gamma = counts.map((val) => val > inputCount - val ? "1" : "0");
const epsilon = gamma.map((val) => val === "1" ? "0" : "1");

const gammaDec = parseInt(gamma.join(""), 2);
const epsilonDec = parseInt(epsilon.join(""), 2);

console.log(gammaDec * epsilonDec);
