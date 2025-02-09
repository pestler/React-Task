import React, { useState, useEffect, FormEvent } from 'react';
import { Person, StarWarsAPIResponse } from '../types/types';
import Pagination from './Pagination';
import Search from './search/Search';
import Main from './main/Main';
import { localStorageService } from '../service/localStorage.service';

const SearchAndPaginate: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [query, setQuery] = useState<string>(
    localStorageService.get('key') || ''
  );

  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent, query: string) => {
    event.preventDefault();
    setQuery(query);
    localStorageService.set('key', query);
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
      {/*
      <div className="cards-container">
        {people.map((person) => (
          <Card key={person.name} person={person} />
        ))}
      </div> */}
      <div className="container">
        <Search onFormSubmit={handleSubmit} value={query} />
        <Main data={people} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default SearchAndPaginate;
