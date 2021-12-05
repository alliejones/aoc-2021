export default class BingoBoard {
  private board: number[][];
  private marks: boolean[][];

  constructor(board: string) {
    this.board = this.parseBoard(board);
    this.marks = Array(this.rowCount).fill(null).map(() =>
      Array(this.colCount).fill(false)
    );
  }

  mark(valueToMark: number) {
    this.walk((val, _, x, y) => {
      if (val === valueToMark) {
        this.marks[y][x] = true;
      }
    });
  }

  hasWin() {
    // at least one row is all true
    const hasAWinningRow = (marks: boolean[][]) =>
      marks.some((row) => row.every((val) => val));

    const rowWin = hasAWinningRow(this.marks);

    // transpose and do the same winning row check
    // (since the columns are now rows)
    const transposed = this.marks[0].map((_, colIndex) =>
      this.marks.map((row) => row[colIndex])
    );
    const colWin = hasAWinningRow(transposed);

    return rowWin || colWin;
  }

  walk(cb: (val: number, marked: boolean, x: number, y: number) => void) {
    for (let x = 0; x < this.colCount; x++) {
      for (let y = 0; y < this.rowCount; y++) {
        cb(this.getValueAt(x, y), this.getMarkAt(x, y), x, y);
      }
    }
  }

  display() {
    return this.board.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        this.getMarkAt(colIndex, rowIndex) ? `*${cell}*` : cell
      ).join(" ")
    ).join("\n");
  }

  getValueAt(x: number, y: number): number {
    return this.board[y][x];
  }

  getMarkAt(x: number, y: number): boolean {
    return this.marks[y][x];
  }

  get rowCount() {
    return this.board.length;
  }

  get colCount() {
    return this.board[0].length;
  }

  private parseBoard(board: string): number[][] {
    return board.split("\n").map((line) =>
      line.trim().split(/\W+/).map((n) => parseInt(n, 10))
    );
  }
}
