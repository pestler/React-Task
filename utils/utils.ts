import { Person, StarWarsAPIResponse } from 'types/types';

export const fetchPeople = async (): Promise<Person[]> => {
  const baseUrl = 'https://swapi.dev/api/people/';
  let results: Person[] = [];
  let currentPage = 1;

  while (true) {
    const url = `${baseUrl}?page=${currentPage}`;
    const response = await fetch(url);
    console.log(response, 'response');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: StarWarsAPIResponse = await response.json();
    results = results.concat(data.results);
    if (!data.next) break;
    currentPage++;
  }
  return results;
};
