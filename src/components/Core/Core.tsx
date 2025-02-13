import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { Person, StarWarsAPIResponse } from '../../types/types';
import Pagination from '../pagination/Pagination';
import ButtonSearch from '../button-search/Button-search';
import Main from '../main/Main';
import useLocalStorage from '../../service/localStorage.service';
import { useLocation, useNavigate } from 'react-router-dom';

interface CoreProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Core: React.FC<CoreProps> = ({ currentPage, onPageChange }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [cachedPeople, setCachedPeople] = useState<{ [key: string]: Person[] }>(
    {}
  );
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [query, setQuery] = useLocalStorage<string>(
    'search_query-star-wars',
    ''
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setQuery(query);
    onPageChange(1);
    navigate(`/?page=1`);
  };

  const fetchPeople = useCallback(
    async (searchQuery: string, page: number) => {
      setLoading(true);
      setError(null);
      try {
        let allPeople: Person[] = [];
        const cacheKey =
          searchQuery === ''
            ? `page_${page}`
            : `search_${searchQuery}_page_${page}`;

        if (cachedPeople[cacheKey]) {
          allPeople = cachedPeople[cacheKey];
        } else {
          const url =
            searchQuery === ''
              ? `https://swapi.dev/api/people/?page=${page}`
              : `https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data: StarWarsAPIResponse = await response.json();
          allPeople = data.results;
          setTotalResults(data.count);

          setCachedPeople((prev) => ({ ...prev, [cacheKey]: allPeople }));
        }

        setPeople(allPeople);
        setTotalPages(Math.ceil(totalResults / 10));
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    },
    [cachedPeople, totalResults]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    if (page) {
      onPageChange(parseInt(page, 10));
    }

    fetchPeople(query, currentPage);
  }, [query, currentPage, location.search, onPageChange, fetchPeople]);

  return (
    <div className="search-and-paginate">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          onPageChange(page);
          navigate(`/?page=${page}`);
        }}
      />
      <div className="container-search-main">
        <section>
          <ButtonSearch onFormSubmit={handleSubmit} value={query} />
          <Main
            data={people}
            loading={loading}
            error={error}
            currentPage={currentPage}
          />
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default Core;
