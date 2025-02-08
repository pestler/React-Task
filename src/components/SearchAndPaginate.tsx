import React, { useState, useEffect, FormEvent } from 'react';
import { Person, StarWarsAPIResponse } from '../types/types';
import Pagination from './Pagination';
import Card from './card/Card';
import { data } from 'react-router-dom';
import Header from './header/Header';
import Main from './main/Main';
import { localStorageService } from '../service/localStorage.service';

const SearchAndPaginate: React.FC = () => {
  const [query, setQuery] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [value, setValue] = useState<string>(
    localStorageService.get('key') || ''
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
 */
  const handleSubmit = (event: FormEvent, value: string) => {
    event.preventDefault();
    setValue(value);
    localStorageService.set('key', value);
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="search-and-paginate">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {/*     <input
        type="text"
        placeholder="Search for a character..."
        value={query}
        onChange={handleSearch}
      />
      <div className="cards-container">
        {people.map((person) => (
          <Card key={person.name} person={person} />
        ))}
      </div> */}
      <div className="container">
        <Header
          onFormSubmit={handleSubmit}
          value={value}
          /* onChange={handleInputChange} */
        />
        <Main data={people} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default SearchAndPaginate;
