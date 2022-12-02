export const fetcher = async (day: number) => {
  console.log('req initiated');
  // const URL = `https://adventofcode.com/2022/day/${day}/input`;

  fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};
