import { readFile } from 'fs/promises';

class Rucksack {
  #items

  constructor(items) {
    this.#items = items;
  }

  get setOfItems() {
    return new Set([...this.#items]);
  }
}

function getCommonChar(setsOfChars) {
  const charCount = new Map();
  setsOfChars.forEach(setOfChar => {
    setOfChar.forEach(char => {
      if (charCount.has(char)) { charCount.set(char, charCount.get(char) + 1); }
      else { charCount.set(char, 1); }
    });
  });
  for (const [char, timesSeen] of charCount) {
    if ( timesSeen === setsOfChars.length) { return char; }
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
  const inputRucksacks = input.split("\n");
  const groupSize = 3;
  let score = 0;
  for (let i = 0; i < inputRucksacks.length; i = i + groupSize) {
    const rucksacks = [...Array(groupSize)].map((_, groupMemberIndex) => new Rucksack(inputRucksacks[i + groupMemberIndex]));
    const commonChar = getCommonChar(rucksacks.map(rucksack => rucksack.setOfItems));
    score += getScore(commonChar);
  }
  return score;
}

console.log(await main());
