type ElfInventory = string[];
type TroupeInventory = ElfInventory[];

const parseInput = (rawInput: string): TroupeInventory =>
  rawInput.split('\n\n').map((nl: string) => nl.split('\n'));

const calorieAdder = (inventory: ElfInventory) => inventory.reduce((acc, cur) => acc + +cur, 0);

function partOne(rawInput: string) {
  const input = parseInput(rawInput);
  let largest = -Infinity;

  for (const inventory of input) {
    const caloricSum = calorieAdder(inventory);
    if (caloricSum > largest) largest = caloricSum;
  }

  return largest;
}

function partTwo(rawInput: string) {
  const input = parseInput(rawInput);

  const [one, two, three] = input.map(calorieAdder).sort((a, b) => b - a);
  return one + two + three;
}

export { partOne, partTwo };
