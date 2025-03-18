import { useState, useEffect } from 'react';
import { Country } from '../types/type';

export const useCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filterRegion, setFilterRegion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  return {
    countries,
    isLoading,
    filterRegion,
    setFilterRegion,
    searchQuery,
    setSearchQuery,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    visitedCountries,
    setVisitedCountries,
  };
};
