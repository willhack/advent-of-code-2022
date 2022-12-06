export function findUniqueWindow(input: string, window: number) {
  for (let i = 0; i < input.length; i++) {
    const set = new Set();
    input
      .slice(i, i + window)
      .split('')
      .forEach((v) => set.add(v));
    if (set.size === window) return window + i;
  }
  throw new Error('Corrupt message...');
}

export const partOne = (input: string) => findUniqueWindow(input, 4);

export const partTwo = (input: string) => findUniqueWindow(input, 14);
