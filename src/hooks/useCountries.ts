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

  const filteredAndSortedCountries = (): Country[] => {
    let filtered = countries;

    if (filterRegion) {
      filtered = filtered.filter((country) => country.region === filterRegion);
    }

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (sortKey === 'name') {
        return sortOrder
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      } else if (sortKey === 'population') {
        return sortOrder
          ? a.population - b.population
          : b.population - a.population;
      }
      return 0;
    });
  };

  return {
    countries: filteredAndSortedCountries(),
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
