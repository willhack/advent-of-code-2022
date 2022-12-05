interface Stacks {
  [k: number]: string[];
}

function buildStacks(initMap: string) {
  const res: Stacks = {};
  const stackRows = initMap.split('\n');
  const stackDepth = stackRows?.pop()?.at(-2) || 0;

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

export function partOne(rawInput: string) {
  //---- Start: fix broken puzzle input
  const t = ' '.repeat(8) + rawInput;
  //---- End: fix broken puzzle input

  const [init, moves] = t.split('\n\n');

  const stacks = buildStacks(init);
  moves.split('\n').forEach((m: string) => {
    const [_move, move, _from, from, _to, to] = m.split(' ');
    for (let i = 0; i < +move; i++) {
      stacks[+to - 1].push(stacks[+from - 1].pop() ?? '');
    }
  });

  const res = Object.values(stacks)
    .map((arr) => arr[arr.length - 1])
    .join('');
  return res;
}

export function partTwo(rawInput: string) {
  //---- Start: fix broken puzzle input
  const t = ' '.repeat(8) + rawInput;
  //---- End: fix broken puzzle input

  const [init, moves] = t.split('\n\n');

  const stacks = buildStacks(init);
  moves.split('\n').forEach((m: string) => {
    const [_move, move, _from, from, _to, to] = m.split(' ');
    stacks[+to - 1].push(...stacks[+from - 1].splice(stacks[+from - 1].length - +move, +move));
  });

  const res = Object.values(stacks)
    .map((arr) => arr[arr.length - 1])
    .join('');
  return res;
}
