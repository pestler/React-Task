import React from 'react';
import SearchAndPaginate from '../../components/SearchAndPaginate';
import './home-page.scss';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Star Wars Characters</h1>
      <div className="container">
        <section className="search-and-paginate-container">
          <SearchAndPaginate />
        </section>
        <section className="cards-detail-container">
          <div>card-info</div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
