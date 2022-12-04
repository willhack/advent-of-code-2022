const test = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

export function partOne(rawInput: string) {
  let total = 0;
  const pairs = rawInput.split('\n');
  for (const pair of pairs) {
    const [one, two] = pair.split(',');
    const [oneLow, oneHigh] = one.split('-');
    const [twoLow, twoHigh] = two.split('-');
    if (
      (+oneLow <= +twoLow && +oneHigh >= +twoHigh) ||
      (+twoLow <= +oneLow && +twoHigh >= +oneHigh)
    ) {
      total++;
    }
  }

  return total;
}

export function partTwo(rawInput: string) {
  let total = 0;
  const pairs = rawInput.split('\n');
  for (const pair of pairs) {
    const [one, two] = pair.split(',');
    const [oneLow, oneHigh] = one.split('-');
    const [twoLow, twoHigh] = two.split('-');
    if (
      (+oneLow <= +twoLow && +oneHigh >= +twoLow) ||
      (+oneLow <= +twoHigh && +oneHigh >= +twoHigh) ||
      (+twoLow <= +oneLow && +twoHigh >= +oneLow) ||
      (+twoLow <= +oneHigh && +twoHigh >= +oneHigh)
    ) {
      total++;
    }
  }

  return total;
}
