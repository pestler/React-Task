import React, { useEffect } from 'react';
import SearchAndPaginate from '../../components/SearchAndPaginate';
import './home-page.scss';
import { Outlet, useLocation, useNavigate } from 'react-router';

interface HomePageProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ currentPage, onPageChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '1', 10);
    onPageChange(page);
  }, [location.search, onPageChange]);

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
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
