const LHPairParse = (highLowPair: string) => {
  const [[x1, x2], [y1, y2]] = highLowPair.split(',').map((p) => p.split('-').map((s) => +s));
  return { x1, x2, y1, y2 };
};

export function partOne(rawInput: string) {
  return rawInput.split('\n').reduce((total, pair) => {
    const { x1, x2, y1, y2 } = LHPairParse(pair);
    return (x1 <= y1 && x2 >= y2) || (y1 <= x1 && y2 >= x2) ? total + 1 : total;
  }, 0);
}

export function partTwo(rawInput: string) {
  return rawInput.split('\n').reduce((total, pair) => {
    const { x1, x2, y1, y2 } = LHPairParse(pair);
    return x1 <= y2 && y1 <= x2 ? total + 1 : total;
  }, 0);
}
