import { path } from "../deps.ts";
import BingoBoard from "./BingoBoard.ts";

const input = await Deno.readTextFile(
  path.join(Deno.cwd(), `day04/input.txt`),
);
const parts = input.split("\n\n");

const calls = parts.shift()?.split(",").map((n) => parseInt(n, 10)) || [];
const boards = parts.map((board) => new BingoBoard(board));

const getWin = (calls: number[], boards: BingoBoard[]) => {
  for (const num of calls) {
    for (const board of boards) {
      board.mark(num);
      if (board.hasWin()) {
        return { board, call: num };
      }
    }
  }
};

const winner = getWin(calls, boards);
if (!winner) {
  throw new Error("No winner found.");
}

const unmarked: number[] = [];
winner?.board.walk((val, marked) => {
  if (!marked) unmarked.push(val);
});
const sum = unmarked.reduce((sum, n) => sum + n, 0);
console.log(sum * winner?.call);
