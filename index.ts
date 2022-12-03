import curl from './curl.js';
import * as dotenv from 'dotenv';
dotenv.config();

const day = process.argv[2];
const URL = `https://adventofcode.com/2022/day/${day}/input`;
const rawInput = await curl(URL, { Cookie: `session=${process.env.SESSION}` });

const { partOne, partTwo } = await import(`./days/${day}.ts`);
console.table({ 'Part One': partOne?.(rawInput), 'Part Two': partTwo?.(rawInput) });
