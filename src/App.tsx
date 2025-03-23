import React, { useCallback } from 'react';
import Header from './components/Layout/Header';
import MainContainer from './components/Layout/MainContainer';
import { useCountries } from './hooks/useCountries';
import SortOptions from './components/Filters/SortOptions';
import SearchBar from './components/Filters/SearchBar';
import FilterDropdown from './components/Filters/FilterDropdown';
import CountryList from './components/CountryList';
import { SortKey } from './types/type';

const App: React.FC = () => {
  const {
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
    handleCountryVisited,
  } = useCountries();

  const handleSortKeyChange = useCallback(
    (value: SortKey) => setSortKey(value),
    [setSortKey]
  );
  const handleSortOrderToggle = useCallback(
    () => setSortOrder(!sortOrder),
    [setSortOrder, sortOrder]
  );
  const handleSearchQueryChange = useCallback(
    (value: string) => setSearchQuery(value),
    [setSearchQuery]
  );
  const handleCountryVisitedCallback = useCallback(
    (countryName: string) => {
      handleCountryVisited(countryName);
    },
    [handleCountryVisited]
  );
  const handleFilterRegionChange = useCallback(
    (value: string) => setFilterRegion(value),
    [setFilterRegion]
  );
  return (
    <div>
      <Header />
      {isLoading ? <p>Loading...</p> : null}
      <MainContainer>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={handleSearchQueryChange}
        />
        <FilterDropdown
          filterRegion={filterRegion}
          setFilterRegion={handleFilterRegionChange}
        />
        <SortOptions
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortKeyChange={handleSortKeyChange}
          onSortOrderToggle={handleSortOrderToggle}
        />
        {countries.length === 0 ? (
          <p>No countries found</p>
        ) : (
          <CountryList
            countries={countries}
            visitedCountries={visitedCountries}
            handleCountryVisited={handleCountryVisitedCallback}
          />
        )}
      </MainContainer>
    </div>
  );
};
export default App;
