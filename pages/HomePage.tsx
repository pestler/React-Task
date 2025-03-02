import { FormEvent, useState } from 'react';
import ButtonSearch from '../components/button-search/ButtonSearch';
import Main from '../components/main/Main';
import styles from './homePage.module.scss';
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div className={styles.homePage}>
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
  );
};

export default HomePage;
