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

const grid = parseInput(input)

const word = "XMAS"
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

type Direction = [number, number]

function isWordPresent(row: number, col: number, direction: Direction): boolean {
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

export function runPart1() {
  console.log(countWord())
}

export function runPart2() {
  console.log(countWord())
}
