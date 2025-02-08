/* import React, { useState, useEffect, FormEvent } from 'react';
//import './app.scss';
import { localStorageService } from '../service/localStorage.service';
import { Person, StarWarsAPIResponse } from '../types/types';
import Header from '../components/header/Header';
import Main from '../components/main/Main';

const App: React.FC = () => {
  const [value, setValue] = useState<string>(
    localStorageService.get('key') || ''
  );
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(value);
  }, [value]);

  useEffect(() => {
    const fetchPeople = async (page: number) => {
      const response = await fetch(
        `https://swapi.dev/api/people/?page=${page}`
      );
      const data: StarWarsAPIResponse = await response.json();
      setPeople(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    };

    fetchPeople(currentPage);
  }, [currentPage]);

  const handleSubmit = (event: FormEvent, value: string) => {
    event.preventDefault();
    setValue(value);
    localStorageService.set('key', value);
  };

  const fetchData = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query}`
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);

      const data = await response.json();
      setData(data.results);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <Header onFormSubmit={handleSubmit} value={value} />
        <Main data={data} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default App; */

import React from 'react';
import SearchAndPaginate from '../components/SearchAndPaginate';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Star Wars Characters</h1>
      <SearchAndPaginate />
    </div>
  );
};

export default HomePage;
