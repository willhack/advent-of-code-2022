import child_process from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(child_process.exec);

export default async function (url: string, headers?: { [k: string]: string }) {
  const headerArgs = Object.entries(headers ?? {})
    .map(([k, v]) => `-H '${k}: ${v}'`)
    .join(' ');
  const { stdout } = await exec(`curl '${url}' ${headerArgs}`);
  return stdout.trim();
}
