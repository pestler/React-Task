import { FormEvent, useState } from 'react';
import ButtonSearch from '../components/button-search/ButtonSearch';
import Main from '../components/main/Main';
import styles from './homePage.module.scss';
import { ThemeProvider } from '../components/theme-context/ThemeProvider';
import { useTheme } from '../components/theme-context/useTheme';
import ThemeToggle from '../components/theme-context/theme-toggle';
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setSearchQuery(query);
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
        }}
      >
        <ThemeToggle />
        <div className={styles.container}>
          <h1>Star Wars Characters</h1>
          <div className={styles.searchAndPaginate}>
            <div className={styles.containerSearchMain}>
              <ButtonSearch onFormSubmit={handleSubmit} />
              <Main searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
