import { readFileSync } from 'fs';

const rawInput = readFileSync('./days/one_input.txt', { encoding: 'utf-8' });
const actual = rawInput.split('\n\n').map((nl: string) => nl.split('\n'));

const calorieAdder = (inventory: string[]) => inventory.reduce((acc, cur) => acc + +cur, 0);

type ElfInventory = string[];
type TroupeInventory = ElfInventory[];

function partOne(input: TroupeInventory) {
  let largest = -Infinity;

  for (const inventory of input) {
    const caloricSum = calorieAdder(inventory);
    if (caloricSum > largest) largest = caloricSum;
  }

  return largest;
}

function partTwo(input: TroupeInventory) {
  const [one, two, three] = input.map(calorieAdder).sort((a, b) => b - a);
  return one + two + three;
}

console.log(partOne(actual));
console.log(partTwo(actual));
