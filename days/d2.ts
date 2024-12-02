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

const getSafeReports1 = (reports: Data): number => {
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

// Part2

const getSafeReports2 = (reports: Data): number => {
  let safeCount = 0

  const isValid = (report: number[]): boolean => {
    let isIncreasing = true
    let isDecreasing = true

    for (let i = 1; i < report.length; i++) {
      const diff = report[i] - report[i - 1]

      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false

      if (diff < 0) isIncreasing = false
      if (diff > 0) isDecreasing = false
    }

    return isIncreasing || isDecreasing
  }

  reports.forEach((report) => {
    if (isValid(report)) {
      safeCount++
      return
    }

    // if report isn't valid remove one level at a time
    for (let i = 0; i < report.length; i++) {
      const modifiedReport = report.slice(0, i).concat(report.slice(i + 1))
      if (isValid(modifiedReport)) {
        safeCount++
        return
      }
    }
  })

  return safeCount
}

export function runPart1() {
  console.log(getSafeReports1(reports))
}

export function runPart2() {
  console.log(getSafeReports2(reports))
}
