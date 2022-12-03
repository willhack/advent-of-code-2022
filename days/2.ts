const choice: { [k: string]: number } = {
  X: 1,
  Y: 2,
  Z: 3
};

const RoundOne: { [k: string]: number } = {
  AX: 3,
  BY: 3,
  CZ: 3,
  AY: 6,
  BZ: 6,
  CX: 6
};

const RoundTwo: { [k: string]: number } = {
  Y: 3,
  Z: 6
};

function chooser(opp: string, res: string) {
  let offset = 65;
  if (res === 'X') offset++;
  if (res === 'Z') offset--;

  return String.fromCharCode(((((opp.charCodeAt(0) - offset) % 3) + 3) % 3) + 88);
}

export const partOne = (rawInput: string) =>
  rawInput
    .split('\n')
    .reduce((acc, [opp, _, ours]) => acc + (RoundOne[opp + ours] || 0) + (choice[ours] || 0), 0);

export const partTwo = (rawInput: string) =>
  rawInput.split('\n').reduce((acc, [opp, _, result]) => {
    return acc + (RoundTwo[result] || 0) + choice[chooser(opp, result)];
  }, 0);
