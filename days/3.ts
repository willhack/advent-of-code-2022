declare global {
  interface String {
    splitAt(index?: number): [string, string];
  }
}

String.prototype.splitAt = function (index: number) {
  return [this.slice(0, index), this.slice(index)];
};

const prioritizer = (char: string) => char.charCodeAt(0) - (char === char.toLowerCase() ? 96 : 38);

export function partOne(rawInput: string) {
  return rawInput.split('\n').reduce((total, bag) => {
    const [left, right] = bag.splitAt(bag.length / 2);
    const [dupe] = left.split('').filter((c) => right.includes(c));
    return total + prioritizer(dupe);
  }, 0);
}

export function partTwo(rawInput: string) {
  let total = 0;
  const re = /(\w+\n){2}\w+\n?/g;
  let match;

  while ((match = re.exec(rawInput))) {
    const [a, b, c] = rawInput.slice(match.index, re.lastIndex).split('\n');
    const [dupe] = a.split('').filter((x) => b.includes(x) && c.includes(x));
    total += prioritizer(dupe);
  }
  return total;
}
