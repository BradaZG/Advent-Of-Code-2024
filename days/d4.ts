import * as fs from "fs"

const input = "./inputs/d4.txt"
const inputTest1 = "./inputs/d4-t1.txt"

function parseInput(path: string): string[][] {
  return fs
    .readFileSync(path, "utf-8")
    .trimEnd()
    .split("\n")
    .map((row) => row.split(""))
}

type Grid = string[][]

const grid: Grid = parseInput(input)

type Direction = [number, number]
type Position = [number, number]

function isWordPresent(row: number, col: number, direction: Direction): boolean {
  const word = "XMAS"

  const [deltaRow, deltaCol] = direction
  for (let i = 0; i < word.length; i++) {
    const newRow = row + deltaRow * i
    const newCol = col + deltaCol * i

    if (
      newRow < 0 ||
      newRow >= grid.length ||
      newCol < 0 ||
      newCol >= grid[0].length ||
      grid[newRow][newCol] !== word[i]
    ) {
      return false
    }
  }

  return true
}

function countWord(): number {
  let count = 0
  const directions: Direction[] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
    [1, 1], // Diagonal down-right
    [-1, -1], // Diagonal up-left
    [1, -1], // Diagonal down-left
    [-1, 1] // Diagonal up-right
  ]

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      for (const direction of directions) {
        if (isWordPresent(row, col, direction)) {
          count++
        }
      }
    }
  }

  return count
}

function isValidWord(start: Position, middle: Position, end: Position): boolean {
  const [row1, col1] = start
  const [row2, col2] = middle
  const [row3, col3] = end

  if (
    row1 < 0 ||
    row1 >= grid.length ||
    col1 < 0 ||
    col1 >= grid[0].length ||
    row2 < 0 ||
    row2 >= grid.length ||
    col2 < 0 ||
    col2 >= grid[0].length ||
    row3 < 0 ||
    row3 >= grid.length ||
    col3 < 0 ||
    col3 >= grid[0].length
  ) {
    return false
  }

  const word = grid[row1][col1] + grid[row2][col2] + grid[row3][col3]
  return word === "MAS" || word === "SAM"
}

function countXPatterns(): number {
  let count = 0

  for (let row = 1; row < grid.length - 1; row++) {
    for (let col = 1; col < grid[0].length - 1; col++) {
      if (grid[row][col] === "A") {
        const topLeft: Position = [row - 1, col - 1]
        const topRight: Position = [row - 1, col + 1]
        const bottomLeft: Position = [row + 1, col - 1]
        const bottomRight: Position = [row + 1, col + 1]

        if (isValidWord(topLeft, [row, col], bottomRight) && isValidWord(bottomLeft, [row, col], topRight)) {
          count++
        }
      }
    }
  }

  return count
}

export function runPart1() {
  console.log(countWord())
}

export function runPart2() {
  console.log(countXPatterns())
}
