import * as fs from "fs"

const input = "./inputs/d3.txt"
const inputTest1 = "./inputs/d3-t1.txt"

function parseInput(path: string): RegExpMatchArray {
  const lines = fs.readFileSync(path, "utf-8").trimEnd()
  const pattern = /mul\(\d+,\d+\)/g

  return lines.match(pattern)
}

const matches = parseInput(input)

// Part1

const numberPairs = matches.map((match) => {
  const numbers = match.match(/\d+/g)
  return numbers ? numbers.map(Number) : []
})

const totalSum = numberPairs.map((pair) => pair.reduce((a, b) => a * b, 1)).reduce((sum, product) => sum + product, 0)

export function runPart1() {
  console.log(totalSum)
}

export function runPart2() {
  console.log(matches)
}
