import React, { useState, useEffect, FormEvent } from 'react';
import { Person, StarWarsAPIResponse } from '../types/types';
import Pagination from './pagination/Pagination';
import Search from './search/Search';
import Main from './main/Main';
import useLocalStorage from '../service/localStorage.service';

interface SearchAndPaginateProps {
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const SearchAndPaginate: React.FC<SearchAndPaginateProps> = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [query, setQuery] = useLocalStorage<string>(
    'search_query-star-wars ',
    ''
  );

  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setQuery(query);
  };

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query}&page=${currentPage}`
      );
      const data: StarWarsAPIResponse = await response.json();
      setPeople(data.results);
      setTotalPages(Math.ceil(data.count / 12));
    };

    fetchPeople();
  }, [query, currentPage]);

  return (
    <div className="search-and-paginate">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <div className="container">
        <section>
          <Search onFormSubmit={handleSubmit} value={query} />
          <Main data={people} loading={loading} error={error} />
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default SearchAndPaginate;
