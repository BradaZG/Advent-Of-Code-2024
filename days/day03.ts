import * as fs from "fs";

const input = "../inputs/day03.txt";
const inputTest = "../inputs/day03-t.txt";

type Data = string[];

function parseInput(path: string): Data[] {
  return fs
    .readFileSync(path, "utf-8")
    .trimEnd()
    .split("\n")
    .map((line) => line.split(""));
}

// Part 1

function checkAdjacentForSymbols(grid: Data[], i: number, j: number): boolean {
  const symbolRegex = /[^\w.]/;

  // Check all 8 surrounding cells
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue; // Skip the cell itself

      const checkI = i + x;
      const checkJ = j + y;

      // Boundary checks
      if (
        checkI >= 0 &&
        checkI < grid.length &&
        checkJ >= 0 &&
        checkJ < grid[checkI].length
      ) {
        if (symbolRegex.test(grid[checkI][checkJ])) {
          return true;
        }
      }
    }
  }

  return false;
}

const part1 = (data: Data[]): number => {
  const valueArr: number[] = [];
  let value = "";
  let symbolArr: boolean[] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (/\d/.test(data[i][j])) {
        value += data[i][j];

        // Check adjacent cells for symbols
        const isAdjacentToSymbol = checkAdjacentForSymbols(data, i, j);
        symbolArr.push(isAdjacentToSymbol);
      } else {
        if (value && symbolArr.some((val) => val === true))
          valueArr.push(Number(value));
        value = "";
        symbolArr = [];
      }
    }
  }

  return valueArr.reduce((prev, curr) => prev + curr, 0);
};

console.log(part1(parseInput(input)));

// Part 2

function checkAdjacentForSymbol(
  grid: Data[],
  i: number,
  j: number,
  starCoordArr: number[]
): boolean {
  // Check all 8 surrounding cells
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue; // Skip the cell itself

      const checkI = i + x;
      const checkJ = j + y;

      // Boundary checks
      if (
        checkI >= 0 &&
        checkI < grid.length &&
        checkJ >= 0 &&
        checkJ < grid[checkI].length
      ) {
        if (starCoordArr[0] === checkI && starCoordArr[1] === checkJ) {
          return true;
        }
      }
    }
  }

  return false;
}

function checkAdjacentForTwoNumbers(
  grid: Data[],
  i: number,
  j: number
): number[] {
  let coordArr: number[] = [];
  let adjString = "";

  // Check all 8 surrounding cells
  for (let x = -1; x <= 1; x++) {
    adjString += ".";
    for (let y = -1; y <= 1; y++) {
      const checkI = i + x;
      const checkJ = j + y;

      // Boundary checks
      if (
        checkI >= 0 &&
        checkI < grid.length &&
        checkJ >= 0 &&
        checkJ < grid[checkI].length
      ) {
        adjString += grid[checkI][checkJ];
      }
      if (coordArr.length === 0) {
        coordArr.push(i);
        coordArr.push(j);
      }
    }
  }

  return adjString.match(/\d+/g).map(Number).length === 2 ? coordArr : [];
}

const part2 = (data: Data[]): number => {
  const valueArr: number[] = [];
  const starCoordArr: number[][] = [];
  let value = "";
  let symbolArr: boolean[] = [];
  const gearsArr: number[] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === "*") {
        const [a, b] = checkAdjacentForTwoNumbers(data, i, j);
        if (a && b) starCoordArr.push([a, b]);
      }
    }
  }

  for (let z = 0; z < starCoordArr.length; z++) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (/\d/.test(data[i][j])) {
          value += data[i][j];
          // Check adjacent cells for symbol
          const isAdjacentToSymbol = checkAdjacentForSymbol(
            data,
            i,
            j,
            starCoordArr[z]
          );
          if (isAdjacentToSymbol) {
            symbolArr.push(true);
          } else {
            symbolArr.push(false);
          }
        } else {
          if (value && symbolArr.some((val) => val === true)) {
            valueArr.push(Number(value));
          }
          value = "";
          symbolArr = [];
        }
      }
    }
  }

  for (let i = 0; i <= valueArr.length - 2; i += 2) {
    gearsArr.push(valueArr[i] * valueArr[i + 1]);
  }

  return gearsArr.reduce((a, b) => a + b, 0);
};

console.log(part2(parseInput(input)));
