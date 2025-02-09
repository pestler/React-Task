import React from 'react';
import SearchAndPaginate from '../../components/SearchAndPaginate';
import './home-page.scss';
import { Outlet } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Star Wars Characters</h1>
      <div className="container">
        <section className="search-and-paginate-container">
          <SearchAndPaginate />
        </section>
        <section className="cards-detail-container">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
