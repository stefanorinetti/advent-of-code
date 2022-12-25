import { readFile } from 'fs/promises';

class Stack {
  #stack

  constructor(stack = []) {
    this.#stack = [...stack];
  }

  get stack() {
    return [...this.#stack];
  }

  push(crate) {
    return this.#stack.push(crate);
  }

  pop() {
    return this.#stack.pop();
  }

  peek() {
    return this.#stack[this.#stack.length - 1];
  }
}

class Ship {
  #crateStacks

  constructor(crateStacks) {
    this.#crateStacks = crateStacks.map(crateStack => new Stack(crateStack));
  }

  moveCrates(amount, from, to) {
    const zeroStartingFrom = from - 1;
    const zeroStartingTo = to - 1;
    while(amount > 0) {
      const crateToBeMoved = this.#crateStacks[zeroStartingFrom].pop();
      this.#crateStacks[zeroStartingTo].push(crateToBeMoved);
      amount--;
    }
  }

  peekTops() {
    return this.#crateStacks.map(crateStack => crateStack.peek());
  }
}

async function main() {
  const crateStacks = [
    ['D', 'B', 'J', 'V'],
    ['P', 'V', 'B', 'W', 'R', 'D', 'F'],
    ['R', 'G', 'F', 'L', 'D', 'C', 'W', 'Q'],
    ['W', 'J', 'P', 'M', 'L', 'N', 'D', 'B'],
    ['H', 'N', 'B', 'P', 'C', 'S', 'Q'],
    ['R', 'D', 'B', 'S', 'N', 'G'],
    ['Z', 'B', 'P', 'M', 'Q', 'F', 'S', 'H'],
    ['W', 'L', 'F'],
    ['S', 'V', 'F', 'M', 'R'],
  ];
  const ship = new Ship(crateStacks);
  const input = (await readFile('./input.txt')).toString();
  input.split('\n').forEach((action) => {
    const [_, amount, __, from, ___, to] = action.split(' ');
    ship.moveCrates(amount, from, to);
  });
  return ship.peekTops().join('');
}

console.log(await main());
