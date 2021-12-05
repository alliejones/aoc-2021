import { path } from "../deps.ts";
import BingoBoard from "./BingoBoard.ts";

const input = await Deno.readTextFile(
  path.join(Deno.cwd(), `day04/input.txt`),
);
const parts = input.split("\n\n");

const calls = parts.shift()?.split(",").map((n) => parseInt(n, 10)) || [];
const boards = parts.map((board) => new BingoBoard(board));

const turn = (boards: BingoBoard[], call: number) =>
  boards.filter((board) => {
    board.mark(call);
    return !board.hasWin();
  });

let remaining = boards;
let prevRemaining: BingoBoard[] = [];
let call = null;
while (remaining.length > 0) {
  call = calls.shift();
  if (call === undefined) throw new Error("Ran out of moves.");

  prevRemaining = remaining;
  remaining = turn(boards, call);
}
const last = prevRemaining[0];
if (!call) throw new Error("Missing number called.");

const unmarked: number[] = [];
last.walk((val, marked) => {
  if (!marked) unmarked.push(val);
});
const sum = unmarked.reduce((sum, n) => sum + n, 0);
console.log(sum, sum * call);
