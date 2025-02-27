import { FormEvent, useState } from 'react';
import ButtonSearch from '../components/button-search/Button-search';
import Main from '../components/main/Main';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div className="back">
      <div className="home-page">
        <div className="container">
          <h1>Star Wars Characters</h1>
          <div className="search-and-paginate">
            <div className="container-search-main">
              <ButtonSearch onFormSubmit={handleSubmit} />
              <Main searchQuery={searchQuery} />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
