import * as fs from "fs"

const input = "./inputs/d2.txt"
const inputTest1 = "./inputs/d2-t1.txt"

type Data = number[][]

function parseInput(path: string): Data {
  const lines = fs.readFileSync(path, "utf-8").trimEnd().split("\n")
  const reports: Data = []

  lines.forEach((line) => {
    const level = line.split(/\s+/).map(Number)
    reports.push(level)
  })

  return reports
}

const reports = parseInput(input)

// Part1

const getSafeReports = (reports: Data): number => {
  let safeCount = 0

  reports.forEach((report) => {
    if (report.length < 2) return

    const isIncreasing = report[1] > report[0]
    const isDecreasing = report[1] < report[0]

    if (!isIncreasing && !isDecreasing) return

    for (let i = 1; i < report.length; i++) {
      const diff = report[i] - report[i - 1]
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return

      if (isIncreasing && diff < 0) return
      if (isDecreasing && diff > 0) return
    }
    safeCount++
  })

  return safeCount
}

// const differenceSum = getDifferencesArr(leftArray, rightArray).reduce((a, b) => a + b, 0)

// Part2

// const getSameValuesProductArr = (leftArr: number[], rightArr: number[]): number[] =>
//   leftArr.map((leftValue) => {
//     return rightArr.filter((val) => val === leftValue).length * leftValue
//   })

// const productSum = getSameValuesProductArr(leftArray, rightArray).reduce((a, b) => a + b, 0)

export function runPart1() {
  console.log(getSafeReports(reports))
}

export function runPart2() {
  console.log(reports)
}
