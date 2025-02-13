import React, { useState, useEffect, FormEvent } from 'react';
import { Person, StarWarsAPIResponse } from '../../types/types';
import Pagination from '../pagination/Pagination';
import ButtonSearch from '../button-search/Button-search';
import Main from '../main/Main';
import useLocalStorage from '../../service/localStorage.service';

interface CoreProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Core: React.FC<CoreProps> = ({
  currentPage,
  onPageChange,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [cachedPeople, setCachedPeople] = useState<{ [key: number]: Person[] }>(
    {}
  );
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useLocalStorage<string>(
    'search_query-star-wars',
    ''
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setQuery(query);
    onPageChange(1);
  };

  const fetchPeopleByPage = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: StarWarsAPIResponse = await response.json();
      setCachedPeople((prev) => ({ ...prev, [page]: data.results }));
      setPeople(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPeople = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: StarWarsAPIResponse = await response.json();
      setPeople(data.results);
      setTotalPages(1);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchPeople(query);
    } else {
      if (cachedPeople[currentPage]) {
        setPeople(cachedPeople[currentPage]);
      } else {
        fetchPeopleByPage(currentPage);
      }
    }
  }, [query, currentPage, cachedPeople]);

  return (
    <div className="search-and-paginate">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <div className="container-search-main">
        <section>
          <ButtonSearch onFormSubmit={handleSubmit} value={query} />
          <Main data={people} loading={loading} error={error} />
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default Core;
