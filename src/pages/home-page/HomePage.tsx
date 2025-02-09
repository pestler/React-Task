import React, { useState } from 'react';
import SearchAndPaginate from '../../components/SearchAndPaginate';
import './home-page.scss';
import { Outlet } from 'react-router-dom';

interface HomePageProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const HomePage: React.FC<HomePageProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="home-page">
      <h1>Star Wars Characters</h1>
      <div className="container">
        <section className="search-and-paginate-container">
          <SearchAndPaginate
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </section>
        <section className="cards-detail-container">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
