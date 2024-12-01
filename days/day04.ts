import * as fs from "fs";

const input = "../inputs/day04.txt";
const inputTest = "../inputs/day04-t.txt";

type Card = { id: number; matches: number };

function parseInput(path: string): Card[] {
  try {
    return fs
      .readFileSync(path, "utf-8")
      .trimEnd()
      .split("\n")
      .map((line) => {
        const [first, second] = line.trim().split(":");
        const id = Number(first.split("Card")[1].trim());

        const numbers = second.trim().split("|");
        const myNumbers = numbers[0]
          .trim()
          .split(" ")
          .filter((char) => char !== "")
          .map(Number);
        const winningNumbers = numbers[1]
          .trim()
          .split(" ")
          .filter((char) => char !== "")
          .map(Number);
        return {
          id,
          matches: myNumbers.filter((num) => winningNumbers.includes(num))
            .length
        };
      });
  } catch (error) {
    console.error("An error occurred while reading the file:", error);
    return [];
  }
}

// Part 1

const part1 = (data: Card[]) => {
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    let res = 0;
    for (let j = 0; j < data[i].matches; j++) {
      if (j === 0) res = 1;
      else {
        res *= 2;
      }
    }
    total += res;
  }

  return total;
};

console.log(part1(parseInput(inputTest)));

// Part 2

// Recursive function to process winning cards
function processCard(
  cardId: number,
  data: Card[],
  cardsCount: Map<number, number>
): void {
  let card = data.find((c) => c.id === cardId);
  if (!card || card.matches === 0) {
    // Card does not win anything, stop processing.
    return;
  }

  // For each match, the card wins the next card
  for (let i = 1; i <= card.matches; i++) {
    let nextCardId = cardId + i;
    let nextCardExists = data.filter((c) => c.id === nextCardId);
    if (nextCardExists) {
      cardsCount.set(nextCardId, (cardsCount.get(nextCardId) || 0) + 1); // Increment or initialize the card count
      processCard(nextCardId, data, cardsCount);
    }
  }
}

const part2 = (data: Card[]): number => {
  let cardsCount = new Map<number, number>();

  // Initialize each card's count to 1 and start processing wins
  data.forEach((card) => {
    cardsCount.set(card.id, (cardsCount.get(card.id) || 0) + 1);
    processCard(card.id, data, cardsCount);
  });

  let totalCards = Array.from(cardsCount.values()).reduce(
    (acc, count) => acc + count,
    0
  );
  return totalCards;
};

console.log(part2(parseInput(inputTest)));
