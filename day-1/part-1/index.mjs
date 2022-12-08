import { readFile } from 'fs/promises';

async function main() {
  const input = (await readFile('./input.txt')).toString();
  let biggestElfBag = 0;
  input.split("\n").reduce((elfBag, currentFood) => {
    const currentFoodWeight = parseInt(currentFood);
    if (Number.isNaN(currentFoodWeight)) {
      if (biggestElfBag < elfBag) biggestElfBag = elfBag;
      return 0;
    }
    return elfBag += currentFoodWeight;
  }, 0);
  return biggestElfBag;
}

console.log(await main());
