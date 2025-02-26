import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Core from '../components/Core/Core';
import ButtonSearch from '../components/button-search/Button-search';
import Main from '../components/main/Main';

//import { useLocation } from 'react-router-dom';

//import './home-page.scss';

/* interface HomePageProps {
  currentPage: number;
} */

const HomePage = () => {
  // const { theme } = useTheme();
  //const location = useLocation();
  //  const [page, setPage] = useState(currentPage);

  /*   useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setPage(parseInt(pageParam, 10));
    }
  }, [location.search]); */

  /* const handlePageChange = (page: number) => {
    setPage(page);
  }; */

  const currentPage = 1;
  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    //setQuery(query);
    //onPageChange(1);
    //navigate(query === '' ? `/` : `/?page=1`);
    console.log(event, query);
  };

  return (
    <div className="back">
      <div className="home-page">
        {/* <ThemeToggle /> */}
        <div className="container">
          <h1>Star Wars Characters</h1>
          <section className="search-and-paginate-container">
            <div className="search-and-paginate">
              {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          onPageChange(page);
          navigate(`/?page=${page}`);
        }}
      /> */}
              <section className="search-main">
                <div className="container-search-main">
                  <ButtonSearch onFormSubmit={handleSubmit} />
                  <Main
                    /* data={data}
            loading={loading}
            error={error} */
                    currentPage={currentPage}
                  />
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
