/* import { useEffect, useState } from 'react';

interface StarWarsAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: unknown[]; // Замена на конкретные типы данных, если известно
}

const fetchPeople = async (searchQuery: string, page: number): Promise<StarWarsAPIResponse> => {
  const baseUrl = 'https://swapi.dev/api/people/';
  const url = searchQuery ? `${baseUrl}?search=${searchQuery}&page=${page}` : `${baseUrl}?page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: StarWarsAPIResponse = await response.json();
  return data;
};

const PeopleComponent = () => {
  const [people, setPeople] = useState<StarWarsAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPeople = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPeople(searchQuery, page);
        setPeople(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPeople();
  }, [searchQuery, page]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {people && (
        <ul>
          {people.results.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
      <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
    </div>
  );
};

export default PeopleComponent;
 */
