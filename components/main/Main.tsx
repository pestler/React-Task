import { useEffect, useState } from 'react';
import { Person } from '../../types/types';
import CardList from '../card-list/Card-list';
import styles from './main.module.scss';
import { useTheme } from '../theme-context/useTheme';

interface MainProps {
  searchQuery: string;
  initialPeople: Person[];
}

interface MainProps {
  searchQuery: string;
  initialPeople: Person[];
}

const Main = ({ searchQuery, initialPeople }: MainProps) => {
  const [allPeople] = useState<Person[]>(initialPeople);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(initialPeople);
  const [currentPagePeople, setCurrentPagePeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    if (searchQuery) {
      const filtered = allPeople.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPeople(filtered);
      setPage(1);
    } else {
      setFilteredPeople(allPeople);
    }
    setLoading(false);
  }, [searchQuery, allPeople]);

  useEffect(() => {
    const start = (page - 1) * 10;
    const end = page * 10;
    if (filteredPeople.length > 0) {
      setCurrentPagePeople(filteredPeople.slice(start, end));
    }
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
      {loading && <span className={styles.loading}>Loading...</span>}
      {error && <span className={styles.error}>Error: {error}</span>}
      {!loading && !error && filteredPeople && (
        <span className={styles.showing}>
          Showing {page * 10 - 9}-{page * 10} of {filteredPeople.length}
        </span>
      )}
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className={styles.button}
      >
        Previous Page
      </button>
      <button
        onClick={handleNextPage}
        disabled={!filteredPeople || page * 10 >= filteredPeople.length}
        className={styles.button}
      >
        Next Page
      </button>
      {currentPagePeople.length > 0 ? (
        <CardList data={currentPagePeople} page={page} />
      ) : (
        <p
          style={{
            height: '30vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
            color: 'rgb(180, 187, 195)',
          }}
        >
          No data available
        </p>
      )}
    </div>
  );
};

export default Main;
