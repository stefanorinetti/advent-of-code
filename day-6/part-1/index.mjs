import { readFile } from 'fs/promises';

async function main() {
  const input = (await readFile('./input.txt')).toString();
  const lastSeenCharPosition = new Map();
  let leftIndex = 0;
  let rightIndex = 0;
  for (const char of input) {
    // check for window to have 4 unique chars - returning where the message starts
    if (rightIndex - leftIndex === 4) { return rightIndex; }
    if (lastSeenCharPosition.has(char)) {
      const previousDuplicateCharIndex = lastSeenCharPosition.get(char);
      // the condition avoids the `leftIndex` to go out of the sliding window
      leftIndex = leftIndex > previousDuplicateCharIndex ? leftIndex : previousDuplicateCharIndex + 1;
    }
    lastSeenCharPosition.set(char, rightIndex);
    rightIndex++;
  }
}

console.log(await main());
