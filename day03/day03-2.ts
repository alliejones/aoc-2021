import readInput from "../util/read-input.ts";
const input = await readInput((line) => line, "day03/input");

const countValue = (values: string[], checkValue: string, pos: number) => {
  return values.reduce((count, value) => {
    if (value[pos] === checkValue) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
};

const mostCommonValue = (
  values: string[],
  pos: number,
) => {
  const oneCount = countValue(values, "1", pos);
  const zeroCount = values.length - oneCount;
  if (oneCount > zeroCount) {
    return "1";
  } else if (oneCount < zeroCount) {
    return "0";
  } else {
    return null;
  }
};

const filterValues = (
  values: string[],
  getValToKeep: (values: string[], pos: number) => "0" | "1",
): string => {
  let result = values;
  let pos = 0;
  while (result.length > 1) {
    const valToKeep = getValToKeep(result, pos);
    result = result.filter((value) => value[pos] === valToKeep);
    pos++;
  }
  return result[0];
};

const oxygenRating = parseInt(
  filterValues(
    input,
    (values, pos) => mostCommonValue(values, pos) ?? "1",
  ),
  2,
);

const co2Rating = parseInt(
  filterValues(
    input,
    (values, pos) => {
      const mostCommon = mostCommonValue(values, pos);
      if (mostCommon === "1") return "0";
      else if (mostCommon === "0") return "1";
      else return "0";
    },
  ),
  2,
);

console.log(oxygenRating * co2Rating);
