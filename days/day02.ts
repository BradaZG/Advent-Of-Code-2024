import * as fs from "fs";

const input = "../inputs/day02.txt";
const inputTest = "../inputs/day02-t.txt";

type Cube = "red" | "blue" | "green";
type Draw = { count: number; cube: Cube };
type Set = Draw[];
type Game = { id: number; sets: Set[] };
type Data = Game[];

function parseInput(path: string): Data {
  try {
    return fs
      .readFileSync(path, "utf-8")
      .trimEnd()
      .split("\n")
      .map((line) => {
        const [first, second] = line.trim().split(":");

        const id = Number(first.split(" ")[1]);

        const sets = second.split(";").map((set) =>
          set.split(",").map((cubes) => {
            const [count, cube] = cubes.trim().split(" ");
            return { count: Number(count), cube };
          })
        );
        return { id, sets } as Game;
      });
  } catch (error) {
    console.error("An error occurred while reading the file:", error);
    return [];
  }
}

// Part1

const part1 = (data: Data): number =>
  data
    .filter((game) =>
      game.sets.every((set) =>
        set.every((draw) => {
          if (draw.cube === "red" && draw.count > 12) return false;
          if (draw.cube === "green" && draw.count > 13) return false;
          if (draw.cube === "blue" && draw.count > 14) return false;
          return true;
        })
      )
    )
    .reduce((sum, currGame) => sum + currGame.id, 0);

console.log(part1(parseInput(input)));

// Part2

const part2 = (data: Data): number =>
  data
    .map((game) => {
      let minRed = 0;
      let minGreen = 0;
      let minBlue = 0;

      game.sets.flat().forEach((draw) => {
        switch (draw.cube) {
          case "red":
            minRed = Math.max(minRed, draw.count);
            break;
          case "green":
            minGreen = Math.max(minGreen, draw.count);
            break;
          case "blue":
            minBlue = Math.max(minBlue, draw.count);
            break;
          default:
            break;
        }
      });

      return minRed * minGreen * minBlue;
    })
    .reduce((prev, curr) => prev + curr, 0);

console.log(part2(parseInput(input)));
