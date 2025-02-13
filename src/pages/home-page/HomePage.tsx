import React, { useEffect, useState } from 'react';
import Core from '../../components/Core/Core';
import './home-page.scss';
import { Outlet, useLocation } from 'react-router';

interface HomePageProps {
  currentPage: number;
}

const HomePage: React.FC<HomePageProps> = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {}, [location.search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-page">
      <h1>Star Wars Characters</h1>
      <div className="container">
        <section className="search-and-paginate-container">
          <Core currentPage={currentPage} onPageChange={handlePageChange} />
        </section>
        <section className="cards-detail-container">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
