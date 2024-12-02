import * as fs from "fs"

const input = "./inputs/d1.txt"
const inputTest1 = "./inputs/d1-t1.txt"

type Data = number[][]

function parseInput(path: string): Data {
  const lines = fs.readFileSync(path, "utf-8").trimEnd().split("\n")

  const leftNumbers: number[] = []
  const rightNumbers: number[] = []

  lines.forEach((line) => {
    const [left, right] = line.split(/\s+/).map(Number)
    leftNumbers.push(left)
    rightNumbers.push(right)
  })

  return [leftNumbers.sort(), rightNumbers.sort()]
}

const [leftArray, rightArray] = parseInput(input)

// Part1

const getDifferencesArr = (leftArr: number[], rightArr: number[]): number[] =>
  leftArr.map((leftValue, index) => {
    // subtract the corresponding right value from the left value
    return Math.abs(leftValue - rightArr[index])
  })

const differenceSum = getDifferencesArr(leftArray, rightArray).reduce((a, b) => a + b, 0)

// Part2

const getSameValuesProductArr = (leftArr: number[], rightArr: number[]): number[] =>
  leftArr.map((leftValue) => {
    return rightArr.filter((val) => val === leftValue).length * leftValue
  })

const productSum = getSameValuesProductArr(leftArray, rightArray).reduce((a, b) => a + b, 0)

export function runPart1() {
  console.log(differenceSum)
}

export function runPart2() {
  console.log(productSum)
}
