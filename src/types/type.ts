export interface Country {
  name: { common: string };
  population: number;
  region: string;
  flags: { png: string };
  visited?: boolean;
}

export type SortKey = 'name' | 'population';

export interface UseCountriesReturn {
  countries: Country[];
  visitedCountries: string[];
  isLoading: boolean;
  filterRegion: string;
  setFilterRegion: (region: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  sortOrder: boolean;
  setSortOrder: (order: boolean) => void;
  handleCountryVisited: (countryName: string) => void;
}
