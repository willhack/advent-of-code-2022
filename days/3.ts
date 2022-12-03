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
    for (const char of left) {
      if (right.indexOf(char) > -1) {
        return total + prioritizer(char);
      }
    }
    return total;
  }, 0);
}

export function partTwo(rawInput: string) {
  let total = 0;
  const re = /(\w+\n){2}\w+\n?/g;
  let match;

  while ((match = re.exec(rawInput))) {
    const [one, two, three] = rawInput.slice(match.index, re.lastIndex).split('\n');
    for (const char of one) {
      if (two.indexOf(char) > -1 && three.indexOf(char) > -1) {
        total += prioritizer(char);
        break;
      }
    }
  }
  return total;
}
