import { readFile } from 'fs/promises';

class Rucksack {
  #compartmentOne
  #compartmentTwo

  constructor(rawRucksack) {
    this.#compartmentOne = rawRucksack.slice(0, rawRucksack.length / 2);
    this.#compartmentTwo = rawRucksack.slice(rawRucksack.length / 2, rawRucksack.length);
  }

  get duplicateItem() {
    const compartmentOneSet = new Set([...this.#compartmentOne]);
    return [...this.#compartmentTwo].find(char => compartmentOneSet.has(char));
  }
}

function getScore(char) {
  const utf16Representation = char.charCodeAt(0);
  if (char === char.toLowerCase()) return utf16Representation - 96;
  if (char === char.toUpperCase()) return utf16Representation - 38;
  throw new Error();
}

async function main() {
  const input = (await readFile('./input.txt')).toString();
  return input.split("\n").reduce((score, rawRucksack) => {
    const rucksack = new Rucksack(rawRucksack);
    const duplicateItemScore = getScore(rucksack.duplicateItem);
    return score += duplicateItemScore;
  }, 0);
}

console.log(await main());
