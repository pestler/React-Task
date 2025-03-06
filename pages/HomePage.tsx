import { FormEvent, useState } from 'react';
import ButtonSearch from '../components/button-search/ButtonSearch';
import Main from '../components/main/Main';
import styles from './HomePage.module.scss';
import { ThemeProvider } from '../components/theme-context/ThemeProvider';
import { useTheme } from '../components/theme-context/useTheme';
import ThemeToggle from '../components/theme-context/theme-toggle';
import { Person } from 'types/types';
import useLocalStorage from '@utils/localStorage.service';

interface HomePageProps {
  initialPeople: Person[];
  initialSearchQuery: string;
}

const HomePage = ({ initialPeople, initialSearchQuery }: HomePageProps) => {
  const [, setSearchQuery] = useState(initialSearchQuery);
  const [searchQueryLocal, setSearchQueryLocal] = useLocalStorage(
    'searchQuery',
    initialSearchQuery
  );
  initialSearchQuery = searchQueryLocal;

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setSearchQuery(query);
    setSearchQueryLocal(query);
  };
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <div
        className={styles.homePage}
        style={{
          background: theme.background,
          backgroundColor: theme.backgroundColor,
          color: theme.color,
          backgroundSize: 'cover',
          height: '100%',
        }}
      >
        <ThemeToggle />
        <div className={styles.container}>
          <h1
            style={{
              color: 'rgb(180, 187, 195)',
              fontSize: '3rem',
            }}
          >
            Star Wars Characters
          </h1>
          <div className={styles.searchAndPaginate}>
            <div className={styles.containerSearchMain}>
              <ButtonSearch
                onFormSubmit={handleSubmit}
                initValue={searchQueryLocal}
              />
              <Main
                searchQuery={searchQueryLocal}
                initialPeople={initialPeople}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
