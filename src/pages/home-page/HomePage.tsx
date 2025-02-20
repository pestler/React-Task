import React, { useEffect, useState } from 'react';
import Core from '../../components/Core/Core';
import './home-page.scss';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../components/theme-context/theme-context';
import ThemeToggle from '../../components/theme-context/theme-toggle';

interface HomePageProps {
  currentPage: number;
}

const HomePage: React.FC<HomePageProps> = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [location.search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ background: theme.background, color: theme.color }}>
      <div className="home-page">
        <ThemeToggle />
        <div className="container">
          <h1>Star Wars Characters</h1>
          <section className="search-and-paginate-container">
            <Core currentPage={currentPage} onPageChange={handlePageChange} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
