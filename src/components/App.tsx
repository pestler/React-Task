import React, { useState, useEffect, FormEvent } from 'react';
import './app.scss';
import Person from '../types/types';
import { localStorageService } from '../service/localStorage.service';
import Header from './header/Header';
import Main from './main/Main';

const App: React.FC = () => {
  const [value, setValue] = useState<string>(
    localStorageService.get('key') || ''
  );
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData(value);
  }, [value]);

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
      );
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
    <div className="container">
      <Header onFormSubmit={handleSubmit} value={value} />
      <Main data={data} loading={loading} error={error} />
    </div>
  );
};

export default App;
