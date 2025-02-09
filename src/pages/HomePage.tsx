import React from 'react';
import SearchAndPaginate from '../components/SearchAndPaginate';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Star Wars Characters</h1>
      <SearchAndPaginate />
    </div>
  );
};

export default HomePage;
