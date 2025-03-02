import { useEffect, useState } from 'react';
import { StarWarsAPIResponse, Person } from '../../types/types';
import CardList from '../card-list/Card-list';
import styles from './main.module.scss';
import { useTheme } from '../theme-context/useTheme';

interface MainProps {
  searchQuery: string;
}

const Main = ({ searchQuery }: MainProps) => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [currentPagePeople, setCurrentPagePeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchPeople = async (): Promise<Person[]> => {
    const baseUrl = 'https://swapi.dev/api/people/';
    let results: Person[] = [];
    let currentPage = 1;

    while (true) {
      const url = `${baseUrl}?page=${currentPage}`;
      const response = await fetch(url);
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

  useEffect(() => {
    const getAllPeople = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPeople();
        setAllPeople(data);
        setFilteredPeople(data);
        setPage(1);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getAllPeople();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = allPeople.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPeople(filtered);
      setPage(1);
    } else {
      setFilteredPeople(allPeople);
    }
  }, [searchQuery, allPeople]);

  useEffect(() => {
    const start = (page - 1) * 10;
    const end = page * 10;
    setCurrentPagePeople(filteredPeople.slice(start, end));
  }, [page, filteredPeople]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));
  const { theme } = useTheme();
  return (
    <div
      className={styles.mainBox}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <p>
          Showing {page * 10 - 9}-{page * 10} of {filteredPeople.length}
        </p>
      )}
      <button onClick={handlePrevPage} disabled={page === 1} className="btn">
        Previous Page
      </button>
      <button
        onClick={handleNextPage}
        disabled={page * 10 >= filteredPeople.length}
        className="btn"
      >
        Next Page
      </button>
      {currentPagePeople.length > 0 ? (
        <CardList data={currentPagePeople} page={page} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Main;
