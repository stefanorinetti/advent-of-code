import { readFile } from 'fs/promises';

class CleaningElf {
  #start
  #end

  constructor(section) {
    const [ start, end ] = section.split('-');
    this.#start = parseInt(start);
    this.#end = parseInt(end);
  }

  get start() {
    return this.#start;
  }

  get end() {
    return this.#end;
  }

  get cleaningRoute() {
    return {
      start: this.#start,
      end: this.#end,
    }
  }

  #isStartInCleaningElfRoute(cleaningElfRoute) {
    return this.#start >= cleaningElfRoute.start && this.#start <= cleaningElfRoute.end;
  }

  #isEndInCleaningElfRoute(cleaningElfRoute) {
    return this.#end >= cleaningElfRoute.start && this.#end <= cleaningElfRoute.start;
  }

  overlapsCleaningElfRoute(cleaningElfRoute) {
    return this.#isStartInCleaningElfRoute(cleaningElfRoute) || this.#isEndInCleaningElfRoute(cleaningElfRoute);
  }
}

async function main() {
  const input = (await readFile('./input.txt')).toString();
  return input.split("\n").reduce((overlappingPairs, elvesPair) => {
    const [ elfOne, elfTwo ] = elvesPair.split(',').map(elf => new CleaningElf(elf));
    if (
      elfOne.overlapsCleaningElfRoute(elfTwo.cleaningRoute) ||
      elfTwo.overlapsCleaningElfRoute(elfOne.cleaningRoute)
    ) { overlappingPairs++; }
    return overlappingPairs;
  }, 0);
}

console.log(await main());
