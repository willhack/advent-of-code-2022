interface Stacks {
  [k: number]: string[];
}

function processInput(rawInput: string) {
  /* Also fixes misaligned puzzle input */
  const [initialMap, rawMoves] = `${' '.repeat(8) + rawInput}`.split('\n\n');
  const stacks = buildStacks(initialMap);

  const moves = rawMoves.split('\n').map((rm) => {
    const [_move, m, _from, f, _to, t] = rm.split(' ');
    return { move: +m, from: +f - 1, to: +t - 1 };
  });

  return { stacks, moves };
}

function buildStacks(initMap: string) {
  const res: Stacks = {};
  const stackRows = initMap.split('\n');
  const stackDepth = stackRows.pop()?.at(-2) || 0;

  const parsedStack = stackRows.map((r: string) => {
    const parsed = [];
    for (let i = 1; i < r.length; i += 4) {
      parsed.push(r[i]);
    }
    return parsed;
  });

  for (let i = 0; i < stackDepth; i++) {
    if (!(i in res)) res[i] = [];
    parsedStack.forEach((r: string[]) => {
      if (r[i] !== undefined && r[i] !== ' ') {
        res[i].unshift(r[i]);
      }
    });
  }
  return res;
}

const exportTopContainer = (stacks: Stacks) =>
  Object.values(stacks)
    .map((arr) => arr[arr.length - 1])
    .join('');

export function partOne(rawInput: string) {
  const { stacks, moves } = processInput(rawInput);

  for (const { move, from, to } of moves) {
    for (let i = 0; i < move; i++) {
      const container = stacks[from].pop();
      if (container === undefined) throw new Error('Someone stole our container!');
      stacks[to].push(container);
    }
  }
  return exportTopContainer(stacks);
}

export function partTwo(rawInput: string) {
  const { stacks, moves } = processInput(rawInput);

  for (const { move, from, to } of moves) {
    const containers = stacks[from].splice(stacks[from].length - move, move);
    stacks[to].push(...containers);
  }
  return exportTopContainer(stacks);
}
