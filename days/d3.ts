import * as fs from "fs"

const input = "./inputs/d3.txt"
const inputTest1 = "./inputs/d3-t1.txt"
const inputTest2 = "./inputs/d3-t2.txt"

const pattern = /mul\(\d+,\d+\)/g

function parseInput(path: string): string {
  return fs.readFileSync(path, "utf-8").trimEnd().replace(/\r?\n/g, "")
}

const matches1 = parseInput(input).match(pattern)

const matches2 = parseInput(input)
  // Remove all "don't()" to "do()" sequences
  .replace(/don't\(\).*?do\(\)/g, "")
  // Remove any unmatched "don't()" left
  .replace(/don't\(\)[^]*$/, "")
  .match(pattern)

const numberPairsProduktSum = (matches: RegExpMatchArray) =>
  matches
    .map((match) => {
      const numbers = match.match(/\d+/g)
      return numbers ? numbers.map(Number) : []
    })
    .map((pair) => pair.reduce((a, b) => a * b, 1))
    .reduce((sum, product) => sum + product, 0)

export function runPart1() {
  console.log(numberPairsProduktSum(matches1))
}

export function runPart2() {
  console.log(numberPairsProduktSum(matches2))
}
