import React, { useEffect, useState } from 'react';
import Core from '../../components/Core/Core';
import { useLocation } from 'react-router-dom';
import ThemeToggle from '../../components/theme-context/theme-toggle';
import './home-page.scss';
import { useTheme } from '../../components/theme-context/useTheme';

interface HomePageProps {
  currentPage: number;
}

const HomePage: React.FC<HomePageProps> = ({ currentPage }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setPage(parseInt(pageParam, 10));
    }
  }, [location.search]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color,
      }}
      className="back"
    >
      <div className="home-page">
        <ThemeToggle />
        <div
          className="container"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
          }}
        >
          <h1>Star Wars Characters</h1>
          <section className="search-and-paginate-container">
            <Core currentPage={page} onPageChange={handlePageChange} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
