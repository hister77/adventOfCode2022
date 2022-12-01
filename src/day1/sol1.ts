import { readFile } from 'fs/promises';

function compare(a: number, b: number): number {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

async function findRichest(path: string, n = 1): Promise<number> {
  if (n < 1) return 0;
  const data = await readFile(path, 'ascii');
  const total_cal = data
    .split(/\s{2,}/)
    .map((elf) => elf.split('\n'))
    .map((elf) =>
      elf.reduce((sum, cal) => {
        sum = sum + Number(cal);
        return sum;
      }, 0),
    )
    .reduce((top, cal) => {
      if (top.length < n) {
        top.push(cal);
        return top;
      }
      if (cal > top.at(-1)) {
        top.pop();
        top.push(cal);
      }
      top.sort(compare);
      return top;
    }, [])
    .reduce((sum, cal) => {
      sum += cal;
      return sum;
    }, 0);
  return total_cal;
}

(async function (): Promise<void> {
  // part 1
  const part1 = await findRichest('data/input1.txt');

  // part 2
  const part2 = await findRichest('data/input1.txt', 3);

  console.log('Solutions:\n', 'part 1: ', part1, '\n', 'part 2: ', part2);
})();
