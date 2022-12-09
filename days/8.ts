const parse = (input: string) => input.split('\n').map((t) => t.split('').map((v) => +v));

const isVisibleOnX = (x: number, row: number[]) =>
  row.slice(0, x).every((v) => v < row[x]) || row.slice(x + 1).every((v) => v < row[x]);

const isVisibleOnY = ([x, y]: [number, number], grid: number[][]) =>
  grid.slice(0, y).every((r) => r[x] < grid[y][x]) ||
  grid.slice(y + 1).every((r) => r[x] < grid[y][x]);

export function partOne(rawInput: string) {
  const grid = parse(rawInput);
  let visibleCount = grid.length * 2 + grid[0].length * 2 - 4;

  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      if (isVisibleOnX(col, grid[row]) || isVisibleOnY([col, row], grid)) {
        visibleCount++;
      }
    }
  }
  return visibleCount;
}

const leftScore = (num: number, row: number[]) => {
  let score = 0;
  for (let i = row.length - 1; i > -1; i--) {
    if (row[i] >= num) return score + 1;
    score++;
  }
  return score;
};

const rightScore = (num: number, row: number[]) => {
  let score = 0;
  for (let i = 0; i < row.length; i++) {
    if (row[i] >= num) return score + 1;
    score++;
  }
  return score;
};

const topScore = (num: number, x: number, grid: number[][]) => {
  let score = 0;
  for (let y = grid.length - 1; y > -1; y--) {
    if (grid[y][x] >= num) return score + 1;
    score++;
  }
  return score;
};

const bottomScore = (num: number, x: number, grid: number[][]) => {
  let score = 0;
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x] >= num) return score + 1;
    score++;
  }
  return score;
};

export function partTwo(rawInput: string) {
  const grid = parse(rawInput);
  let highestScore = -Infinity;

  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[row].length - 1; col++) {
      const tree = grid[row][col];
      const totalScore =
        leftScore(tree, grid[row].slice(0, col)) *
        rightScore(tree, grid[row].slice(col + 1)) *
        topScore(tree, col, grid.slice(0, row)) *
        bottomScore(tree, col, grid.slice(row + 1));
      if (totalScore > highestScore) highestScore = totalScore;
    }
  }
  return highestScore;
}
