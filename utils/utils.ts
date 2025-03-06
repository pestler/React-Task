import { Person, StarWarsAPIResponse } from 'types/types';

export const fetchPeople = async (): Promise<Person[]> => {
  const baseUrl = 'https://swapi.dev/api/people/';
  const results: Person[] = [];
  let currentPage = 1;

  try {
    while (true) {
      const url = `${baseUrl}?page=${currentPage}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data: StarWarsAPIResponse = await response.json();
      results.push(...data.results);
      if (!data.next) break;
      currentPage++;
    }
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }

  return results;
};
