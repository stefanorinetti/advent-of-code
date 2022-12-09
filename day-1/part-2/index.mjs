import { readFile } from 'fs/promises';

class TroopCaloriesReserve {
  #biggestElfBags;

  constructor(backups = 0) {
    this.#biggestElfBags = Array(backups).fill(0);
  }

  set backup(newElfBag) {
    if (this.#biggestElfBags[0] < newElfBag) {
      this.#biggestElfBags[0] = newElfBag;
      this.#biggestElfBags.sort();
    }
  }

  get totalBackupCalories() {
    return this.#biggestElfBags.reduce((totalFoodWeight, currentFoodWeight) => {
      totalFoodWeight += currentFoodWeight;
      return totalFoodWeight;
    }, 0);
  }
}

async function main() {
  const input = (await readFile('./input.txt')).toString();
  const troopTopCaloriesReserver = new TroopCaloriesReserve(3);
  input.split("\n").reduce((elfBag, currentFood) => {
    const currentFoodWeight = parseInt(currentFood);
    if (Number.isNaN(currentFoodWeight)) {
      troopTopCaloriesReserver.backup = elfBag;
      return 0;
    }
    return elfBag += currentFoodWeight;
  }, 0);
  return troopTopCaloriesReserver.totalBackupCalories;
}

console.log(await main());
