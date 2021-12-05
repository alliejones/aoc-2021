import { assertEquals } from "../deps-test.ts";

import BingoBoard from "./BingoBoard.ts";

const sampleBoard = `22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19`;

const sampleBoard2 = `14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

Deno.test("BingoBoard parsing", () => {
  const board = new BingoBoard(sampleBoard);

  assertEquals(board.getValueAt(0, 0), 22);
  assertEquals(board.getValueAt(3, 0), 11);
  assertEquals(board.getValueAt(4, 4), 19);
  assertEquals(board.getValueAt(1, 3), 10);
});

Deno.test("BingoBoard marking", () => {
  const board = new BingoBoard(sampleBoard);
  [7, 4, 9, 5, 11].forEach((value) => {
    board.mark(value);
  });
  assertEquals(board.getMarkAt(0, 0), false);
  assertEquals(board.getMarkAt(3, 3), false);
  assertEquals(board.getMarkAt(3, 0), true);
  assertEquals(board.getMarkAt(3, 1), true);
  assertEquals(board.getMarkAt(1, 2), true);
  assertEquals(board.getMarkAt(4, 2), true);
  assertEquals(board.getMarkAt(4, 3), true);
});

Deno.test("BingoBoard example win", () => {
  const board = new BingoBoard(sampleBoard);
  const board2 = new BingoBoard(sampleBoard2);
  [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24].forEach((value) => {
    board.mark(value);
    board2.mark(value);
  });
  assertEquals(board.hasWin(), false);
  assertEquals(board2.hasWin(), true);
});

Deno.test("BingoBoard row win", () => {
  const board = new BingoBoard(sampleBoard);
  [22, 13, 17, 11].forEach((value) => {
    board.mark(value);
  });
  assertEquals(board.hasWin(), false);

  board.mark(0);
  assertEquals(board.hasWin(), true);
});

Deno.test("BingoBoard col win", () => {
  const board = new BingoBoard(sampleBoard);
  [11, 4, 16, 18].forEach((value) => {
    board.mark(value);
  });
  assertEquals(board.hasWin(), false);

  board.mark(15);
  assertEquals(board.hasWin(), true);
});
