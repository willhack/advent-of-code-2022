let partOneTotal = 0;
const partTwoFootprints: number[] = [];

type FileSize = number;
class Dir {
  parent: Dir | null;
  children: { [k: string]: FileSize | Dir };
  footprint: number;
  constructor(parent?: Dir) {
    this.parent = parent ?? null;
    this.children = {};
    this.footprint = 0;
  }
  mkdir(dirname: string) {
    if (!(dirname in this.children)) this.children[dirname] = new Dir(this);
  }
  cat(fname: string, size: number) {
    if (!(fname in this.children)) this.children[fname] = size;
  }
  computeFootprintAndDeleteCircular() {
    this.parent = null;
    this.footprint = Object.values(this.children).reduce((acc: number, cur) => {
      if (typeof cur === 'number') return acc + cur;
      cur.computeFootprintAndDeleteCircular();
      if (cur.footprint < 100000) {
        partOneTotal += cur.footprint;
      }
      return acc + cur.footprint;
    }, 0);
    partTwoFootprints.push(this.footprint);
  }
}

function createFS(rawInput: string) {
  const FS = new Dir();
  let cur = FS;
  const commandList = rawInput
    .split('$')
    .map((c) =>
      c
        .trim()
        .split('\n')
        .filter((v) => v.length)
    )
    .filter((v) => v.length);

  commandList.forEach((cmd) => {
    if (cmd[0] === 'ls') {
      for (let i = 1; i < cmd.length; i++) {
        const [size, tName] = cmd[i].split(' ');
        if (size === 'dir') {
          cur.mkdir(tName);
        } else {
          cur.cat(tName, +size);
        }
      }
    } /* cd */ else {
      const [_, dirName] = cmd[0].split(' ');
      if (dirName === '..' && cur.parent) {
        cur = cur.parent;
      } else {
        cur.mkdir(dirName);
        cur = cur.children[dirName];
      }
    }
  });
  FS.computeFootprintAndDeleteCircular();
  return FS;
}

export const partOne = (rawInput: string) => {
  createFS(rawInput);
  return partOneTotal;
};

export const partTwo = (rawInput: string) => {
  const FS = createFS(rawInput);
  const target = (FS.footprint ?? 0) - 40000000;
  partTwoFootprints.sort((a, b) => a - b);
  for (const fp of partTwoFootprints) {
    if (target - fp < 0) return fp;
  }
};
