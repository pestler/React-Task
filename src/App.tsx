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

  return (
    <div>
      <Header />
      {isLoading ? <p>Loading...</p> : null}
      <MainContainer>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterDropdown
          filterRegion={filterRegion}
          setFilterRegion={setFilterRegion}
        />
        <SortOptions
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortKeyChange={handleSortKeyChange}
          onSortOrderToggle={handleSortOrderToggle}
        />
        <CountryList
          countries={countries}
          visitedCountries={visitedCountries}
          handleCountryVisited={handleCountryVisited}
        />
      </MainContainer>
    </div>
  );
};
export default App;
