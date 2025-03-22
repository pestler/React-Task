import { useState, useEffect, useMemo, useCallback } from 'react';
import { Country, SortKey, UseCountriesReturn } from '../types/type';

export const useCountries = (): UseCountriesReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filterRegion, setFilterRegion] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response: Response = await fetch(
          'https://restcountries.com/v3.1/all'
        );
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (error: unknown) {
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredAndSortedCountries = useMemo((): Country[] => {
    // Фильтрация стран
    let filtered = countries;

    if (filterRegion) {
      filtered = filtered.filter((country) => country.region === filterRegion);
    }

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Сортировка стран
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
  }, [countries, filterRegion, searchQuery, sortKey, sortOrder]);

  const handleCountryVisited = useCallback(
    (countryName: string): void => {
      if (visitedCountries.includes(countryName)) {
        setVisitedCountries((prev) =>
          prev.filter((name) => name !== countryName)
        );
      } else {
        setVisitedCountries((prev) => [...prev, countryName]);
      }
    },
    [visitedCountries]
  );

  return {
    countries: filteredAndSortedCountries,
    visitedCountries,
    isLoading,
    filterRegion,
    setFilterRegion,
    searchQuery,
    setSearchQuery,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    handleCountryVisited,
  };
};
